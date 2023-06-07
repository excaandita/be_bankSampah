const responseHandle = require('../helpers/utils/response.utils')
const jwt = require('jsonwebtoken')
const config = require('../../config')
const User = require('../user/model')

module.exports = {
    //isLoginAdmin -> digunakan untuk validasi token yg dipakai adalah Admin dan digunakan untuk hak akses Login Admin
    isLoginAdmin: async(req, res, next) => {
        try {
            const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;

            const data = jwt.verify(token, config.jwtSecret)
            
            const user = await User.findOne({_id: data.user.id}).populate('group_id')

            if(!user){
                throw new Error()
            } else {
                if(user.group_id.name !== 'Admin'){
                    responseHandle.forbidden(res, "You are not allowed to access this page!!!");
                }
                
                req.user = user
                req.token = token

                next()
            }
        } catch (error) {
            
        }
    },
    //isLoginUser -> digunakan untuk validasi token yg dipakai adalah User dan digunakan untuk hak akses Login User
    isLoginUser: async(req, res, next) => {
        try {
            const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;
            
            const data = jwt.verify(token, config.jwtSecret)

            const user = await User.findOne({_id: data.user.id})

            if(!user){
                throw new Error()
            } 

            req.user = user
            req.token = token

            next()

        } catch (error) {
            responseHandle.unauthorized(res)
        }
    },

    isLogin: async(req, res, next) => {
        try {
            console.log(req.session.userLogin)

            if(req.session.userLogin === null || req.session.userLogin === undefined) {
                throw new Error();
            } else {
                next();
            }
        } catch (error) {
            responseHandle.forbidden(res, "You are not logged in");
        }
        
        
    }
}