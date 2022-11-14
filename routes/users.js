const express = require('express')
const router = express.Router()
const { addUser} = require('../controllers/users')
const { check } = require('express-validator')
const { isValidRol,  existEmail} = require('../helpers/db-validators')

// router.get('/', getUsers)
// router.get('/:id', getUser)
router.post('/',[
    
] ,addUser)
// router.delete('/:id', deleteUser)
// router.put('/:id', editUser)

module.exports = router