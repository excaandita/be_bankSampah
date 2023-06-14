const responseHandle = require('../helpers/utils/response.utils')
const User = require('../user/model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('../../config')

module.exports = {

    login: async (req, res, next) => {
        const {username, password} = req.body

        User.findOne({username: username}).then((user)=>{
            if(user){
                const checkPassword = bcrypt.compareSync(password, user.password)
                if(checkPassword){
                    const token = jwt.sign({
                        user: {
                            id: user.id,
                            username: user.username,
                            email: user.email,
                            fullname: user.fullname,
                            phoneNumber: user.phoneNumber,
                            address: user.address
                        }
                    }, config.jwtSecret)

                    // req.session.userLogin = {
                    //     id: user.id,
                    //     username: user.username,
                    //     token: token
                    // }

                    responseHandle.ok(res, {token});

                } else {
                    responseHandle.forbidden(res, "Password is not correct");
                }
            } else {
                responseHandle.forbidden(res, "Username or Email not registered");
            }
        }).catch((error) => {
            responseHandle.error(res);

            next();
        })  
    }

}