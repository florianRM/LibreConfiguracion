const { request, response } = require('express');

const isAdminRole = (req = request, res = response, next) => {
    if(!req.user) {
        return res.status(500).json({
            msg: 'Se debe validar el token antes'
        })
    }

    const { rol, name } = req.user;

    if(rol != 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} no es admin`
        })
    }

    next();
}

const hasRol = (...roles) => {
    return (req = request, res = response, next) => {
        const {role, name} = req.user;
        if(!roles.contains(role)) {
            return res.status(401).json({
                msg: `${name} no tiene ningun rol permitido`
            })
        }

        next();
    }
}

module.exports = { isAdminRole, hasRol };