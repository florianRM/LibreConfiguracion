const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const user = require('../models/user');

const validateJwt = async (req = request, res = response, next) => {
    const token = req.header('x-token');
    if(!token) {
        return res.status(401).json({msg: 'No hay token'});
    }

    try {
        const uid = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await user.findById({uid});

        if(!user) {
            return res.status(401).json({
                msg: 'No existe el usuario'
            })
        }

        if(!user.state) {
            return res.status(401).json({
                msg: 'El usuario no esta activo'
            })
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
    }
}

module.exports = { validateJwt };