const { request, response } = require('express')
const path = require('node:path');
const { v4 } = require('uuid');

const uploadFile = (req = request, res = response) => {
    let sampleFile;
    let uploadPath;
    const extensiones = ['.jpeg', '.jpg', '.pdf'];

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({msg: 'No files were uploaded.'});
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.file;
    const extensionFichero = path.extname(sampleFile.name)

    if(!extensiones.includes(extensionFichero)) {
        return res.status(401).json({msg: `Solo se puede subir ficheros ${extensiones}`})
    }

    const nombre = v4() + extensionFichero;
    uploadPath = path.join(__dirname, '../uploads', nombre);
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function(err) {
        if (err)
            return res.status(500).json({msg: err});

        res.json({msg: `Se ha enviado correctamente a ${uploadPath}`, fileExtension: extensionFichero});
    });
}

module.exports = {
    uploadFile
}