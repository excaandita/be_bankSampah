const mongoose = require('mongoose')

let transactionSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    priceTransaction: {
        type: Number,
        require:[true, 'Email Harus Diisi']
    },
    garbages: [{
        id_garbage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Garbage',
        },
        garbageName: {
            type: String
        },
        qty: {
            type:Number,
            require: [true, 'Quantity harus diisi'],
            default: 0
        },
        price: {
            type:Number,
            require: [true, 'Harga per barang harus diisi'],
            default: 0
        },
        totalPrice: {
            type:Number,
            require: [true, 'Total Harga harus diisi'],
            default: 0
        }
    }],
    officer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        enum: ['Pending', 'Success', 'Failed'],
        default: 'Pending'
    }
}, {timestamps: true})

module.exports = mongoose.model('Transaction', transactionSchema)