const { request, response } = require('express');
const Pub = require('../models/pub');
const Cerveza = require('../models/beer');

async function getPubs(req = request, res = response) {
    res.json(await Pub.find({Name, Street} = req.query));
}

async function getPub(req = request, res = response) {
    res.json(await Pub.findById({_id: req.params.id}));
}

async function getPubBeers(req = request, res = response) {
    res.json(await Pub.find({_id, Name, Street} = req.query).populate({path: 'Beers', model: 'Cerveza'}));
}

async function addPub(req = request, res = response) {
    const {Name, Street, Beers} = req.body;

    const pub = new Pub({Name, Street, Beers});

    await pub.save();

    if(Beers != undefined) {
        const _id = pub.id;
        await Cerveza.updateOne({_id: Beers}, {$push: {Pubs: _id}})
    }

    res.send('Enviado');
}

async function updatePub(req = request, res = response) {
    const {_id} = req.body;
    res.json(await Pub.updateOne({_id}, {Name, Street} = req.body))
}

async function addBeerInPub(req = request, res = response) {
    const {_id, Beers} = req.body;
    const update = await Pub.updateOne({_id}, {$push: {Beers}});

    const beer = await Cerveza.findById(Beers);
    beer.Pubs.push(_id);
    await beer.save();

    res.json(update);
}

async function deletePub(req = request, res = response) {
    res.json(await Pub.deleteOne({_id: req.body.id}));
}

module.exports = {getPubs, getPub, getPubBeers, addPub, addBeerInPub, deletePub, updatePub};