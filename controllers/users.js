const User = require('../models/user')
const bcryptjs = require('bcryptjs');
const { request } = require('express');
const { response } = require('express');

const getUsers = async(req = request, res = response) => {
    const users = await User.findOne({});
    res.json(users);
}

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

const deleteUser = async(req = request, res = response) => {
    const id = req.params.id;

    const user = await User.findByIdAndDelete(id);

    res.json(user);
}

module.exports = {addUser, getUsers, deleteUser}