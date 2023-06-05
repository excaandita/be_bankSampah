const responseHandle = require('../helpers/utils/response.utils')
const User = require('../user/model')
const jwtMiddlewares = require('../helpers/middleware')
const bcrypt = require('bcryptjs')

module.exports = {

    login: async (req, res) => {
        try {
            const {username, password} = req.body
            
            const checkUser = await User.findOne({username: username});
    
            if(!checkUser) return responseHandle.badRequest(res, 'User not found')

            const passwordMatch = await bcrypt.compare(password, checkUser.password);
            
            
            if (!passwordMatch) {
                return responseHandle.badRequest(res, "Invalid username or password"); 
            }
            
            const token = jwtMiddlewares.generateToken(checkUser._id);
            // console.log(token);
            responseHandle.ok(res, token, "Token generated")

        } catch (err) {
            console.log(err)
            responseHandle.error(res);
        }
    }
}