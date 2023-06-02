const GroupUser = require('./model')
var mongoose = require('mongoose')

module.exports = {
    list: async(req, res)=>{
        try {
            const group_user = await GroupUser.find()

            res.status(200).json({
                data: group_user
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
                let group_user = new GroupUser(payload)    
                await group_user.save();          

                return res.status(201).json({
                    data: group_user
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

            const group_user = await GroupUser.findOne({_id: id})
            
            if(group_user !== null){
                res.status(200).json({
                    data: group_user
                })
            } else {
                res.status(200).json({
                    message: "Data Not Found",
                    data: group_user
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

            const group_user = await GroupUser.findOneAndUpdate(
                                {_id: id}, 
                                payload
                            );

            if(group_user !== null) {
                const group_userUpdated = await GroupUser.findOne({_id: id})
                res.status(200).json({
                    data: group_userUpdated
                })
            } else {
                res.status(200).json({
                    message: "Data Not Found",
                    data: group_user
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
            const group_user = await GroupUser.findOneAndRemove({_id: id})
            if(group_user !== null) {
                res.status(200).json({
                    message: "Delete Successfully",
                    data: group_user
                })
            } else {
                res.status(200).json({
                    message: "Data Not Found",
                    data: group_user
                })
            }
            
        } catch (err) {
            res.status(500).json({
                message: err.message || `Internal Server Error`
            })
        }
    }
}