const express = require('express');
const router = express.Router();
const {getPubs, getPub, getPubBeers, addPub, addBeerInPub, deletePub, updatePub} = require('../controllers/pubs');

router.get('/', getPubs);

router.get('/sells', getPubBeers);

router.post('/', addPub);

router.put('/', updatePub)

router.put('/addBeer', addBeerInPub);

router.delete('/', deletePub);

router.get('/:id', getPub);

module.exports = router;