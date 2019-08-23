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
router.put('/:id', (req, res) => {
    res.send('Editar Posto');
});

// @route       POST api/postos
// @desc        Remover um posto
// @access      Public
router.delete('/:id', (req, res) => {
    res.send('Remover Posto');
});


module.exports = router;