const User = require('../models/user')
const bcryptjs = require('bcryptjs');
const { request } = require('express');
const { response } = require('express');
const req = require('express/lib/request');
const { use } = require('../routes/users');

const getUsers = async(req = request, res = response) => {
    const {skip = 1, limit = 2} = req.query;
    const users = await User.find({'status': true}).skip(skip).limit(limit);
    res.json(users);
}

const addUser = async(req, res) => {
    const { name, email, password, rol, img} = req.body;
    
    // Encriptar la contraseña
    const user = new User({name, email, password, rol, img})
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    await user.save();

    res.json(
        user
    )

}

const deleteUser = async(req = request, res = response) => {
    const id = req.params.id;
    
    const user = await User.findByIdAndUpdate(id, {'status': false});

    res.json(user);
}

const updateUser = async(req = request, res = response) => {
    const id = req.params.id;
    const {_id, email, ...userBody} = req.body

    const salt = bcryptjs.genSaltSync();
    userBody.password = bcryptjs.hashSync( userBody.password, salt );
    const user = await User.findByIdAndUpdate(id, userBody);

    res.json(user);
}

module.exports = {addUser, getUsers, deleteUser, updateUser}