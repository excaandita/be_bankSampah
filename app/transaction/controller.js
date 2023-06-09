const Transaction = require('./model')
const HistoryTransaction = require('../history_transaction/model')
const Garbage = require('../garbage/model')
var mongoose = require('mongoose')
const responseHandle = require('../helpers/utils/response.utils')

module.exports = {
    list: async(req, res)=>{
        // const {page = 1 , limit = 10} = req.query
        try {
            const transaction = await Transaction.find()
                .populate('user')
                .populate('officer')
                .populate('garbage_name')

            responseHandle.ok(res, transaction)
        } catch (err) {
            responseHandle.error(res);
        }
    },

    create: async(req, res, next) => {
        try {
            const payload = req.body;   
            var tot = 0
            for (let i = 0; i < payload.garbages.length; i++) {
                var garbage = await Garbage.findOne({_id: payload.garbages[i].id_garbage})
                
                payload.garbages[i].garbageName = garbage.name
                payload.garbages[i].price = garbage.appPrice
                payload.garbages[i].totalPrice = garbage.appPrice * payload.garbages[i].qty
                tot = tot+payload.garbages[i].totalPrice
            }
            
            payload.priceTransaction = tot
            
            // save to collection transaction
            let transaction = new Transaction(payload)    
                await transaction.save();   

            
            let historyTransaction = new HistoryTransaction({
                id_transaction: payload._id,

            });

            // show saved data
            transaction = await Transaction.findOne(transaction._id)
                .populate('user')
                .populate('officer')
                .populate('garbage_name')
            
            responseHandle.ok(res, transaction);

        } catch (error) {
            responseHandle.error(res);
        }
    }
}