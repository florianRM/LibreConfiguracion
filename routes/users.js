const express = require('express')
const router = express.Router()
const { addUser, getUsers, deleteUser, updateUser } = require('../controllers/users')
const { check } = require('express-validator');
const { validateFields } = require('../helpers/validate-fields');
const { isValidRol,  existEmail, existsId } = require('../helpers/db-validators');
const { validateJwt } = require('../middlewares/jwt-validator');
const { isAdminRole, hasRol } = require('../middlewares/validate-rol');

router.get('/', getUsers)

// router.get('/:id', getUser)

router.post('/',[
    check('email','Email is invalid').isEmail(),
    check('email').custom(existEmail),
    check('password', 'Password must be between 6 and 12').isLength({min: 6, max:12}),
    check('rol').custom(isValidRol),
    check('name','Name is mandatory').not().isEmpty(),
    validateFields
] ,addUser)

router.delete('/:id', [
    validateJwt,
    // isAdminRole,
    hasRol('ADMIN_ROLE', 'DELETE_ROLE'),
    check('id', 'No es un id correcto').isMongoId(),
    check('id').custom(existsId),
    validateFields
], deleteUser)

router.put('/:id', [
    check('password', 'Password must be between 6 and 12').isLength({min: 6, max:12}),
    check('rol').custom(isValidRol),
    check('name','Name is mandatory').not().isEmpty(),
    validateFields
], updateUser)

module.exports = router