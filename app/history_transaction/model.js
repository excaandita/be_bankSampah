const mongoose = require('mongoose')

let historyTransactionSchema = mongoose.Schema({
    id_transaction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction'
    },
    priceTransaction: {
        type: Number,
        require:[true, 'Harga Total Harus Diisi']
    },
    garbages: [{
        garbage_name: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Garbage',
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

module.exports = mongoose.model('HistoryTransaction', historyTransactionSchema)