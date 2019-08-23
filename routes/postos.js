const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Posto = require('../models/Posto');

// @route       GET api/postos
// @desc        Pegar os postos
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
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const { name, address, gasprice} = req.body;

    try {
        let posto = await Posto.findOne({ address });

        if(posto){
            return res.status(400).json({msg: 'O posto já existe'});
        }

        posto = new Posto({
            name,
            address,
            gasprice
        });

        await posto.save();

        res.send("Posto adicionado");
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route       PUT api/postos
// @desc        Editar um posto
// @access      Public
router.put('/:id',
[
    check('name', 'name is required').not().isEmpty(),
    check('address', 'address is required').not().isEmpty(),
], async (req, res) => {

    const { name, address, gasprice} = req.body;

    const postoFields = {};
    if(name) postoFields.name = name;
    if(address) postoFields.address = address;
    if(gasprice) postoFields.gasprice = gasprice;

    try {
        let posto = await Posto.findById(req.params.id);
        if(!posto) {
            return res.status(404).json({ msg: "Posto Não encontrado" });
        }

        posto = await Posto.findByIdAndUpdate(
            req.params.id,
            {$set: postoFields},
            {new: true}
        );

        res.json(posto);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({msg: "Server Error" })
    }
});

// @route       POST api/postos
// @desc        Remover um posto
// @access      Public
router.delete('/:id', async (req, res) => {
    try {
        let posto = await Posto.findById(req.params.id);
        if(!posto) {
            return res.status(404).json({ msg: "Posto Não encontrado" });
        }
        await Posto.findByIdAndDelete(req.params.id)
        res.status(200).json({msg: "Posto Removido com sucesso" })
    } catch (err) {
        console.log(err.message);
        res.status(500).json({msg: "Server Error" })
    }
});

module.exports = router;