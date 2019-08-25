const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Posto = require('../models/Posto');
var cron = require('node-cron');


//Call updateAllGasPrices() every day
cron.schedule(' */2 * * * *', async () => {
    let postos = await Posto.find();
    postos.forEach(updateAllGasPrices);
});

// Update all gas prices of the DB
async function updateAllGasPrices(item) {

    if (item.gasolina_comun_price.length >= 1) {
        item.gasolina_comun_price.push(item.gasolina_comun_price[item.gasolina_comun_price.length - 1]);
        if (item.gasolina_comun_price.length >= 31) {
            item.gasolina_comun_price.shift();
        }
    }
    if (item.gasolina_aditivada_price.length >= 1) {
        item.gasolina_aditivada_price.push(item.gasolina_aditivada_price[item.gasolina_aditivada_price.length - 1]);
        if (item.gasolina_aditivada_price.length >= 31) {
            item.gasolina_aditivada_price.shift();
        }
    }
    if (item.etanol_price.length >= 1) {
        item.etanol_price.push(item.etanol_price[item.etanol_price.length - 1]);
        if (item.etanol_price.length >= 31) {
            item.etanol_price.shift();
        }
    }
    if (item.gnv_price.length >= 1) {
        item.gnv_price.push(item.gnv_price[item.gnv_price.length - 1]);
        if (item.gnv_price.length >= 31) {
            item.gnv_price.shift();
        }
    }
    if (item.diesel_price.length >= 1) {
        item.diesel_price.push(item.diesel_price[item.diesel_price.length - 1]);
        if (item.diesel_price.length >= 31) {
            item.diesel_price.shift();
        }
    }
    if (item.alcool_price.length >= 1) {
        item.alcool_price.push(item.alcool_price[item.alcool_price.length - 1]);
        if (item.alcool_price.length >= 31) {
            item.alcool_price.shift();
        }
    }

    const gasPricesFields = {};
    gasPricesFields.gasolina_comun_price = item.gasolina_comun_price;
    gasPricesFields.gasolina_aditivada_price = item.gasolina_aditivada_price;
    gasPricesFields.etanol_price = item.etanol_price;
    gasPricesFields.gnv_price = item.gnv_price;
    gasPricesFields.alcool_price = item.alcool_price;
    gasPricesFields.diesel_price = item.diesel_price;

    await Posto.findByIdAndUpdate(
        item.id,
        { $set: gasPricesFields },
    );
}

// @route       GET api/postos
// @desc        Pegar a lista de postos
// @access      Public
router.get('/', async (req, res) => {
    try {
        let postos = await Posto.find();
        res.json(postos);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

// @route       POST api/postos
// @desc        Cadastrar um posto
// @access      Public
router.post('/',
    [
        check('name', 'name is required').not().isEmpty(),
        check('address', 'address is required').not().isEmpty(),

    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, address, gasolina_comun_price, gasolina_aditivada_price, etanol_price, gnv_price, diesel_price, alcool_price } = req.body;

        try {
            let posto = await Posto.findOne({ address });

            if (posto) {
                return res.status(400).json({ msg: 'O posto já existe' });
            }

            posto = new Posto({
                name,
                address,
                gasolina_comun_price,
                gasolina_aditivada_price,
                etanol_price,
                gnv_price,
                diesel_price,
                alcool_price
            });

            await posto.save();

            res.json(posto);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

// @route       PUT api/postos
// @desc        Editar informações de um posto
// @access      Public
router.put('/:id',
    [
        check('name', 'name is required').not().isEmpty(),
        check('address', 'address is required').not().isEmpty(),
    ], async (req, res) => {

        const { name, address, gasolina_comun_price, gasolina_aditivada_price, etanol_price, gnv_price, diesel_price, alcool_price } = req.body;

        const postoFields = {};
        if (name) postoFields.name = name;
        if (address) postoFields.address = address;
        if (gasolina_comun_price) postoFields.gasolina_comun_price = gasolina_comun_price;
        if (gasolina_aditivada_price) postoFields.gasolina_aditivada_price = gasolina_aditivada_price;
        if (etanol_price) postoFields.etanol_price = etanol_price;
        if (gnv_price) postoFields.gnv_price = gnv_price;
        if (diesel_price) postoFields.diesel_price = diesel_price;
        if (alcool_price) postoFields.alcool_price = alcool_price;

        try {
            let posto = await Posto.findById(req.params.id);
            if (!posto) {
                return res.status(404).json({ msg: "Posto Não encontrado" });
            }

            posto = await Posto.findByIdAndUpdate(
                req.params.id,
                { $set: postoFields },
                { new: true }
            );

            res.json(posto);
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ msg: "Server Error" })
        }
    });

// @route       DELETE api/postos
// @desc        Remover um posto
// @access      Public
router.delete('/:id', async (req, res) => {
    try {
        let posto = await Posto.findById(req.params.id);
        if (!posto) {
            return res.status(404).json({ msg: "Posto Não encontrado" });
        }
        await Posto.findByIdAndDelete(req.params.id)
        res.status(200).json({ msg: "Posto Removido com sucesso" })
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: "Server Error" })
    }
});

module.exports = router;