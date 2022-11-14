const User = require('../models/usuario')
const bcryptjs = require('bcryptjs')

const addUser = async(req, res) => {

    const { name, email, password, rol} = req.body;
    
    // Encriptar la contraseña
    const user = new User({name, email, password, rol})
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );


    
    await user.save();

    res.json(
        user
    )

}

module.exports = {addUser}