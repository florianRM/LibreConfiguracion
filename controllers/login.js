const bcryptjs = require("bcryptjs");
const { request, response } = require("express");
const user = require("../models/user");

const loginCheck = async (req = request, res = response) => {
    const { email, password } = req.body;
    const userDB = await user.findOne({email});

    if(userDB) {
        const passwordExist = bcryptjs.compareSync(password, userDB.password);
        const userActive = userDB.status;

        if(passwordExist && userActive) {
            res.send(userDB);
        } else {
            res.send('La contraseña no es correcta o el usuario no es activo')
        }
    } else {
        res.send('El usuario no existe')
    }
}

module.exports = { loginCheck }