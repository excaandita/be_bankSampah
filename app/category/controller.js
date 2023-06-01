const config = require('../../config');
const Category = require('./model')

module.exports = {
    index: async(req, res)=>{
        try {
            res.render('index', {
                title: 'PANTREKKKKK'
            })
        } catch (err) {
            console.log(err);
        }
    },

    create: async(req, res, next)=>{
        try {
            //ambil data dari body
            const payload = req.body;      

            //masukin payload td ke model kategori
            let category = new Category(payload)    
            
            //kalo berhasil await data td akan ke save
            await category.save();          

            res.status(201).json({
                data: category
            })

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
    }
}