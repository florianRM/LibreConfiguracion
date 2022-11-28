const express = require('express');
const router = express.Router();
const {getBeers ,getBeer ,addBeer, updateBeer, deleteBeer} = require('../controllers/beers.js');
const { check } = require('express-validator');
const { validateFields } = require('../helpers/validate-fields');
const { existsId } = require('../helpers/db-validators')

router.get('/', getBeers);

router.get('/:id', [
    check('id', 'No es un id correcto').isMongoId(),
    check('id').custom(existsId),
    validateFields
], getBeer);

router.post('/add', [
    check('Proof', 'Proof cannot be negative').isInt({min: 0}),
    validateFields
], addBeer);

router.put('/:id', updateBeer);

router.delete('/:id', deleteBeer)

module.exports = router;