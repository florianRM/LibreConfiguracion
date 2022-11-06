const { request, response } = require('express');
const Cerveza = require('../models/beer');

async function getBeers(req = request, res = response) {
    res.json(await Cerveza.find({Name, Description, Proof, Price} = req.query));
}

async function getBeer(req = request, res = response) {
    res.json(await Cerveza.findById(req.params.id));
}

async function addBeer(req = request, res = response) {
    const {Name, Description, Proof, Bootle = 'Botella de 33cl', Price} = req.body;

    const beer = new Cerveza({Name, Description, Proof, Bootle, Price});

    await beer.save();

    res.send('Enviado');
}

async function updateBeer(req = request, res = response) {
    const updateBeer = await Cerveza.updateOne({_id: req.params.id}, {Description, Proof, Price} = req.query);
    res.json(updateBeer);
}

async function deleteBeer(req = request, res = response) {
    const deleteBeer = await Cerveza.deleteOne({_id: req.params.id});
    res.json(deleteBeer);
}

module.exports = {getBeers ,getBeer, addBeer, updateBeer, deleteBeer};