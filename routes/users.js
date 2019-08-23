const express = require('express');
const router = express.Router();

// @route       GET api/users
// @desc        Pegar os users
// @access      Public
router.get('/', (req, res) => {
    res.send('Pegar users');
});

// @route       POST api/users
// @desc        Cadastrar um user
// @access      Public
router.post('/', (req, res) => {
    res.send('Cadastrar user');
});

// @route       PUT api/users
// @desc        Editar um user
// @access      Public
router.put('/:id', (req, res) => {
    res.send('Editar user');
});

// @route       POST api/users
// @desc        Remover um user
// @access      Public
router.delete('/:id', (req, res) => {
    res.send('Remover user');
});


module.exports = router;