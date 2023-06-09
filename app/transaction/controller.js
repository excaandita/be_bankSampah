const Transaction = require('./model')
const HisTransactionController = require('../history_transaction/controller')
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
                payload.garbages[i].price = garbage.sellPrice
                payload.garbages[i].totalPrice = garbage.sellPrice * payload.garbages[i].qty
                tot = tot+payload.garbages[i].totalPrice
            }
            payload.priceTransaction = tot
            
            // save to collection transaction
            let transaction = new Transaction(payload)    
                await transaction.save();   

            transaction = await Transaction.findOne(transaction._id)
                .populate('user')
                .populate('officer')
                .populate('garbage_name')

            //save to collection History Transaction
            await HisTransactionController.save_transaction(transaction);
                
            responseHandle.ok(res, transaction);

        } catch (error) {
            responseHandle.error(res);
        }
    },

    edit: async(req, res, next) => {

    }
}