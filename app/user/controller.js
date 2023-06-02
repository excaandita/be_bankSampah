const User = require('./model')
var mongoose = require('mongoose')

module.exports = {
    list: async(req, res)=>{
        try {
            const user = await User.find()
            .populate('group_id') //untuk terhubung dengan collections category

            res.status(200).json({
                data: user
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

            if(payload.username !== "" && payload.username !== undefined) {
                let user = new User(payload)    
                await user.save();          

                user = await User.find(user._id).populate('group_id')

                return res.status(201).json({
                    data: user
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

            const user = await User.findOne({_id: id}).populate('group_id')
            
            if(user !== null){
                res.status(200).json({
                    data: user
                })
            } else {
                res.status(200).json({
                    message: "Data Not Found",
                    data: user
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
            
            const user = await User.findOneAndUpdate(
                                {_id: id}, 
                                payload
                            );

            if(user !== null) {
                const userUpdated = await User.findOne({_id: id}).populate('group_id');
                res.status(200).json({
                    data: userUpdated
                })
            } else {
                res.status(200).json({
                    message: "Data Not Found",
                    data: user
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
            const user = await User.findOneAndRemove({_id: id})
            if(user !== null) {
                res.status(200).json({
                    message: "Delete Successfully",
                    data: user
                })
            } else {
                res.status(200).json({
                    message: "Data Not Found",
                    data: user
                })
            }
            
        } catch (err) {
            res.status(500).json({
                message: err.message || `Internal Server Error`
            })
        }
    }
}