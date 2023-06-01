const mongoose = require('mongoose')
let garbageSchema = mongoose.Schema({
    name: {
        type: String,
        require:[true, 'Nama Barang Harus Diisi']
    },
    category: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    toniPrice: {
        type: Number
    },
    appPrice: {
        type: Number
    },
    sellPrice: {
        type: Number
    },
    status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'Y'
    }
}, {timestamps: true})

module.exports = mongoose.model('Garbage', garbageSchema)