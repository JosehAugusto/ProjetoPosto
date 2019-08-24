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
        type: [Number],
    },
    gasolina_aditivada_price: {
        type: [Number],
    },
    etanol_price: {
        type: [Number],
    },
    gnv_price: {
        type: [Number],
    },
    diesel_price: {
        type: [Number],
    },
    alcool_price: {
        type: [Number],
    }
});

module.exports = mongoose.model('posto', PostoSchema);