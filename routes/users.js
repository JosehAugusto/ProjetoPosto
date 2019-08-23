const express = require('express');
const router = express.Router();
const bcryp = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

// @route       GET api/users
// @desc        Pegar os users
// @access      Public
router.get('/', (req, res) => {
    res.send('Pegar users');
});

// @route       POST api/users
// @desc        Cadastrar um user
// @access      Public
router.post('/',
[
    check('name', 'Please inform a name').not().isEmpty(),
    check('email', 'Please infomr a valid email').isEmail(),
    check('password', 'Please inform a password with 6 characters or more').isLength({min: 6})
], async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const { name, email, password} = req.body;

    try {
        let user = await User.findOne({ email });

        if(user){
            return res.status(400).json({msg: 'Este email já esta cadastrado'});
        }

        user = new User({
            name,
            email,
            password
        })

        const salt = await bcryp.genSalt(10);

        user.password = await bcryp.hash(password, salt);

        await user.save();

        res.send("Usuario adicionado");
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
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