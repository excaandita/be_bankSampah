const mongoose = require('mongoose')
let userSchema = mongoose.Schema({
    username: {
        type: String,
        require:[true, 'Username Harus Diisi'],
        maxLength: [225, "Panjang Username terdiri 8 - 225 Karakter"],
        minLength: [8, "Panjang Username harus antara 8 - 225 Karakter"],
    },
    email: {
        type: String,
        require:[true, 'Email Harus Diisi']
    },
    fullname: {
        type: String,
        require:[true, 'Nama Lengkap Harus Diisi']
    },
    password: {
        type: String,
        require:[true, 'Password Harus Diisi'],
        maxLength: [225, "Panjang Password terdiri 8 - 225 Karakter"],
        minLength: [8, "Panjang Password harus antara 8 - 225 Karakter"],
    },
    address: {
        type: String,
        require:[true, 'Alamat Harus Diisi']
    },
    phoneNumber: {
        type: String,
        require:[true, 'Alamat Harus Diisi'],
        maxLength: [225, "Panjang No.telp terdiri 8 - 225 Karakter"],
        minLength: [8, "Panjang No.telp harus antara 8 - 225 Karakter"],
    },
    group_id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GroupUser'
    },
    status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'Y'
    }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)