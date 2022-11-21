const express = require('express')
const router = express.Router()
const { addUser, getUsers, deleteUser } = require('../controllers/users')
const { check } = require('express-validator');
const { validateFields } = require('../helpers/validate-fields');
const { isValidRol,  existEmail, existsId } = require('../helpers/db-validators')

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
    check('id', 'No es un id correcto').isMongoId(),
    check('id').custom(existsId),
    validateFields
], deleteUser)
// router.put('/:id', editUser)

module.exports = router