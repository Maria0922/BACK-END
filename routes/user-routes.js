const express = require('express');
const router = express.Router();
const userController = require('../models/user-controller');
const {check} = require('express-validator');

//router.get('/:pid', userController.getUsers);
router.get('/', userController.getUsers);

router.post('/signup',
    [
        check('name').not().isEmpty(),
        check('password').isLength({min: 5}),
        check('email').isEmail()
    ]
    ,
    userController.signup);

router.post('/login', userController.login);

module.exports = router;