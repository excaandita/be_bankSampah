const config = require('../../config');
const Category = require('./model')

module.exports = {
    list: async(req, res)=>{
        try {
            const category = await Category.find()

            res.status(200).json({
                data: category
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
                //masukin payload td ke model kategori
                let category = new Category(payload)    

                //kalo berhasil await data td akan ke save
                await category.save();          

                return res.status(201).json({
                    data: category
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

            const category = await Category.findOne({_id: id})
            
            if(category !== null){
                res.status(200).json({
                    data: category
                })
            } else {
                res.status(200).json({
                    message: "Data Not Found",
                    data: category
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
            const {name, description} = req.body

            const category = await Category.findOneAndUpdate(
                                {_id: id}, 
                                {name, description}
                            );

            if(category !== null) {
                const categoryUpdated = await Category.findOne({_id: id})
                res.status(200).json({
                    data: categoryUpdated
                })
            } else {
                res.status(200).json({
                    message: "Data Not Found",
                    data: category
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
            const category = await Category.findOneAndRemove({_id: id})
            if(category !== null) {
                res.status(200).json({
                    message: "Delete Successfully",
                    data: category
                })
            } else {
                res.status(200).json({
                    message: "Data Not Found",
                    data: category
                })
            }
            
        } catch (err) {
            res.status(500).json({
                message: err.message || `Internal Server Error`
            })
        }
    }


}