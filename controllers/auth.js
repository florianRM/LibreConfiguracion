const bcryptjs = require("bcryptjs");
const { request, response } = require("express");
const user = require("../models/user");

const loginCheck = async (req = request, res = response) => {
    const { email, password } = req.body;
    try {
        const userDB = await user.findOne({email});

        if(!userDB) {
            return res.status(401).json({msg: 'User/password incorrect - email'});
        }
        if(!userActive) {
            return res.json({msg: 'User/password incorrect - inactive'});
        }

        const passwordExist = bcryptjs.compareSync(password, userDB.password);

        if(!passwordExist) {
            return res.json({msg: 'User/password incorrect - password'});
        }

        res.json(userDB);
    } catch (error) {
        console.log('Error en el servidor.');
        res.status(500).json({
            msg: 'Error en el servidor.'
        })
    }
}

module.exports = { loginCheck }