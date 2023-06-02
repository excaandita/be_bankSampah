const mongoose = require('mongoose')
let groupUserSchema = mongoose.Schema({
    name: {
        type: String,
        require:[true, 'Nama Group Harus Diisi']
    },
    status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'Y'
    }
}, {timestamps: true})

module.exports = mongoose.model('GroupUser', groupUserSchema)