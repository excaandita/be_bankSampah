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
        id_garbage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Garbage',
        },
        garbageName: {
            type: String
        },
        qty: {
            type:Number,
            default: 0
        },
        price: {
            type:Number,
            default: 0
        },
        totalPrice: {
            type:Number,
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
    },
    historyNote: {
        type: String
    }
}, {timestamps: true})

module.exports = mongoose.model('HistoryTransaction', historyTransactionSchema)