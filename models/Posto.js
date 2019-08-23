const mongoose = require('mongoose');

const PostoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
        unique: true
    },
    gasprice: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('posto', PostoSchema);