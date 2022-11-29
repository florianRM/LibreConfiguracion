const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const { loginCheck } = require('../controllers/auth');
const { validateFields } = require('../helpers/validate-fields');

router.post('/login', [
    check('email', 'Email is invalid').isEmail(),
    check('password', 'Password cannot be empty').not().isEmpty(),
    validateFields
], loginCheck);

module.exports = router;