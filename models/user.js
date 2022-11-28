const { Schema, model} = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is mandatory']
    },
    email: {
        type: String,
        required: [true, 'Mail is mandatory'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is require'],
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true
    }
})

module.exports = model( 'User', UserSchema )