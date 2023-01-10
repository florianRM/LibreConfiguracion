const fs = require('fs');
const path = require('path');


const { request, response } = require('express');
const { uploadFile } = require('../helpers/uploadImage');
const user = require('../models/user');
const beer = require('../models/beer');

const upload = async(req, res = response) => {
    const { collection } = req.params;
    let name = 'imgs';

    switch(collection) {
        case 'user':
            name = 'user';
            break;
        case 'beer':
            name = 'beers';
            break;
    }
    
    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No files were uploaded.');
        return;
    }

    try {
        
        // txt, md
        // const nombre = await uploadFile( req.files, ['txt','md'], 'textos' );
        const nombre = await uploadFile( req.files, undefined, name );
        res.json({ nombre });
        
    } catch (msg) {
        res.status(400).json({ msg });
    }

}

const updateImage = async (req = request, res = response) => {
    const { id, collection } = req.params;
    let obj, collectionName;

    switch(collection) {
        case 'user':
            obj = await user.findById(id);
            collectionName = 'user';
            break;
        case 'beer':
            obj = await beer.findById(id);
            collectionName = 'beer';
            break;
    }

    if(obj) {
        const dirLocation = path.join(__dirname, '../uploads', collectionName, obj.img);

        if(!fs.existsSync(dirLocation)) {
            return res.status(400).json({msg: "El fichero no existe."});
        }
        fs.unlinkSync(dirLocation);

        if (!req.files || Object.keys(req.files).length === 0) {
            res.status(400).send('No files were uploaded.');
            return;
        }
    
        try {
            
            // txt, md
            // const nombre = await uploadFile( req.files, ['txt','md'], 'textos' );
            const nombre = await uploadFile( req.files, undefined, collectionName );
            obj.img = nombre;
            obj.save();
    
        } catch (msg) {
            res.status(400).json({ msg });
        }
    }
    res.json({});
} 

const getImage = async (req = request, res = response) => {
    const { id, collection } = req.params;
    let obj, collectionName;

    switch(collection) {
        case 'user':
            obj = await user.findById(id);
            collectionName = 'user';
            break;
        case 'beer':
            obj = await beer.findById(id);
            collectionName = 'beers';
            break;
    }

    const dirLocation = path.join(__dirname, '../uploads', collectionName, obj.img);
    
    if(!fs.existsSync(dirLocation)) {
        return res.status(400).json({msg: "El fichero no existe."});
    }

    res.sendFile(dirLocation);
}

module.exports = {
    upload, updateImage, getImage
}