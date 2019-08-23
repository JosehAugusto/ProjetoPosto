const express = require('express');
const router = express.Router();

// @route       GET api/postos
// @desc        Pegar os postos
// @access      Public
router.get('/', (req, res) => {
    res.send('Pegar postos');
});

// @route       POST api/postos
// @desc        Cadastrar um posto
// @access      Public
router.post('/', (req, res) => {
    res.send('Cadastrar Posto');
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