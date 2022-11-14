const User =require('../models/user');

const isValidRol = async (rol = '')=> {
	const existeRol = await Rol.findOne({ rol })
		  if (!existeRol) {
			  throw new Error(`Rol ${rol} not exists in database`)
		  }
}

const existEmail = async (email) => {
    const existsEmail = await User.findOne({ email });
    if (existsEmail) {
        throw new Error(`Email already exist.`);
    }
}

module.exports = {isValidRol, existEmail}