const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const { loginCheck } = require('../controllers/login');
const { validateFields } = require('../helpers/validate-fields');

router.post('/', [
    check('email', 'Email is invalid').isEmail(),
    check('password', 'Password cannot be empty').isLength({min: 1}),
    validateFields
], loginCheck);

module.exports = router;