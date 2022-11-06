const {Schema, model} = require('mongoose');

const CervezaSchema = Schema({
    Name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    Description: {
        type: String,
        required: [true, 'Description is required']
    },
    Proof: {
        type: String,
        required: [true, 'Proof is required']
    },
    Bootle: {
        type: String
    },
    Price: {
        type: String,
        required: true
    },
    Pubs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Pub'
        }
    ]
});

module.exports = model('Cerveza', CervezaSchema);