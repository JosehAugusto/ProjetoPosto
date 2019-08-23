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
    gasolina_comun_price: {
        type: Number,
        required: false
    },
    gasolina_aditivada_price: {
        type: Number,
        required: false
    },
    etanol_price: {
        type: Number,
        required: false
    },
    gnv_price: {
        type: Number,
        required: false
    },
    diesel_price: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('posto', PostoSchema);