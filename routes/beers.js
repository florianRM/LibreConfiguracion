const express = require('express');
const router = express.Router();
const {getBeers ,getBeer ,addBeer, updateBeer, deleteBeer} = require('../controllers/beers.js');

router.get('/', getBeers);

router.get('/:id', getBeer);

router.post('/add', addBeer);

router.put('/:id', updateBeer);

router.delete('/:id', deleteBeer)

module.exports = router;