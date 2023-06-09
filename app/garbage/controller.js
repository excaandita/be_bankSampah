const Category = require('../category/model') 
const Garbage = require('./model')
var mongoose = require('mongoose')

module.exports = {
    list: async(req, res)=>{
        try {
            const garbage = await Garbage.find()
            .populate('category') //untuk terhubung dengan collections category

            res.status(200).json({
                data: garbage
            })

        } catch (err) {
            res.status(500).json({
                message: err.message || `Internal Server Error`
            })
        }
    },

    create: async(req, res, next)=>{
        try {
            //ambil data dari body
            const payload = req.body;   

            if(payload.name !== "" && payload.name !== undefined) {
                let garbage = new Garbage(payload)    
                await garbage.save();          

                garbage = await Garbage.find(garbage._id).populate('category')

                return res.status(201).json({
                    data: garbage
                })
            } else {
                return res.status(422).json({
                    message: "Data Not Complete"
                })
            }
            
        } catch (err) {
            if(err && err.name === "ValidationError"){
                return res.status(422).json({
                    error: 1,
                    message: err.message,
                    fields: err.errors
                })
            }
            next(err);
        }
    },

    get: async(req, res)=>{
        try {
            const {id} = req.params

            const garbage = await Garbage.findOne({_id: id}).populate('category')
            
            if(garbage !== null){
                res.status(200).json({
                    data: garbage
                })
            } else {
                res.status(200).json({
                    message: "Data Not Found",
                    data: garbage
                })
            }
            
        } catch (err) {
            res.status(500).json({
                message: err.message || `Internal Server Error`
            })
        }
    },

    edit: async(req, res)=>{
        try {
            const {id} = req.params
            const payload = req.body
            console.log(payload)
            const garbage = await Garbage.findOneAndUpdate(
                                {_id: id}, 
                                payload
                            );

            if(garbage !== null) {
                const gargabeUpdated = await Garbage.findOne({_id: id}).populate('category');
                res.status(200).json({
                    data: gargabeUpdated
                })
            } else {
                res.status(200).json({
                    message: "Data Not Found",
                    data: garbage
                })
            }
                
        } catch (err) {
            res.status(500).json({
                message: err.message || `Internal Server Error`
            })
        }
    },

    deleteItem: async(req, res)=>{
        try {
            const {id} = req.params
            const garbage = await Garbage.findOneAndRemove({_id: id})
            if(garbage !== null) {
                res.status(200).json({
                    message: "Delete Successfully",
                    data: garbage
                })
            } else {
                res.status(200).json({
                    message: "Data Not Found",
                    data: garbage
                })
            }
            
        } catch (err) {
            res.status(500).json({
                message: err.message || `Internal Server Error`
            })
        }
    }
}