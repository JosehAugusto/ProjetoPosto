const express = require('express');
const router = express.Router();
const bcryp = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

// @route       GET api/users
// @desc        pegar usuario logado
// @access      Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route       POST api/users
// @desc        Logar um user
// @access      Public
router.post('/', 
[
    check('email', 'Please infomr a valid email').isEmail(),
    check('password', 'Please inform a password with 6 characters or more').isLength({min: 6})
], async (req, res) => {
    
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const { email, password} = req.body;

    try {
        let user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({msg: 'Credenciais Invalidas'});
        }

        const isMatch = await bcryp.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({msg: 'Credenciais Invalidas'});
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), 
        (err, token) =>{
            if(err) throw err;
            res.json({token});
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



module.exports = router;