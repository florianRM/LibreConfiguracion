const User = require('../models/user');
const Rol = require('../models/rol');

const isValidRol = async (rol = '') => {
	const existeRol = await Rol.findOne({ rol })
		  if (!existeRol) {
			  throw new Error(`Rol ${rol} not exists in database`)
		  }
}

const existEmail = async (email) => {
    const existsEmail = await User.findOne({ email });
    if (existsEmail) {
        throw new Error(`Email ${email} already exist.`);
    }
}

const existsId = async (id) => {
    const existsId = await User.findById(id);
    if(!existsId) {
        throw new Error(`Id doesn't exist.`);
    }
}

module.exports = {isValidRol, existEmail, existsId}