const bcryptjs = require("bcryptjs");
const { request, response } = require("express");
const User = require("../models/user");
const { genJWT } = require("../helpers/genJWT");

const loginCheck = async (req = request, res = response) => {
    const { email, password } = req.body;
    try {
        const userDB = await User.findOne({email});

        if(!userDB) {
            return res.status(401).json({msg: 'User/password incorrect - email'});
        }
        if(!userDB.status) {
            return res.json({msg: 'User/password incorrect - inactive'});
        }

        const passwordExist = bcryptjs.compareSync(password, userDB.password);

        if(!passwordExist) {
            return res.json({msg: 'User/password incorrect - password'});
        }
        const token = await genJWT(userDB.id);
        res.json({
            userDB,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor.'
        })
    }
}

module.exports = { loginCheck }