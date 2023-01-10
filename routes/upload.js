const express = require('express');
const { check } = require('express-validator');
const { upload, updateImage, getImage } = require('../controllers/upload');
const { validateFields } = require('../helpers/validate-fields');
const router = express.Router();
const collecionts = ['beer', 'user'];

router.post('/', upload);

router.get('/:collection/:id', [
    check('id', 'El id no es valido').isMongoId(),
    check('collection', 'La coleccion no es correcta').isIn(collecionts),
    validateFields
], getImage);

router.put('/:collection/:id', [
    check('id', 'El id no es valido').isMongoId(),
    check('collection', 'La coleccion no es correcta').isIn(collecionts),
    validateFields
], updateImage);

module.exports = router;