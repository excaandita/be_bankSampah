const m_HistoryTransaction = require('./model')
var mongoose = require('mongoose')
const responseHandle = require('../helpers/utils/response.utils')

module.exports = {
    save_transaction: async(transaction) => {
        try {
            let dataTransaction = {
                id_transaction: transaction._id,
                priceTransaction: transaction.priceTransaction,
                garbages: transaction.garbages,
                officer: transaction.officer,
                status: transaction.status
            }
            
            //save to collection History Transaction
            let historyTransaction = new m_HistoryTransaction(dataTransaction)
                await historyTransaction.save()

        } catch (error) {
            responseHandle.error(res);
        }
    }
}