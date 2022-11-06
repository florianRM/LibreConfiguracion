const {Schema, model} = require('mongoose');

const PubSchema = Schema({
    Name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    Street: {
        type: String,
        required: [true, 'Street is required']
    },
    Beers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Cerveza'
        }
    ]
})

module.exports = model('Pub', PubSchema);