const mongoose = require('mongoose')
let categorySchema = mongoose.Schema({
    name: {
        type: String,
        require:[true, 'Nama Kategori Harus Diisi']
    },
    description: {
        type: String
    }
}, {timestamps: true})

module.exports = mongoose.model('Category', categorySchema)