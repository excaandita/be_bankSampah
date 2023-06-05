const jwt = require("jsonwebtoken") 
const config = require("../../config/index.js");
const responseHandle = ("./utils/response.utils.js")

module.exports = {
    generateToken: (userId) =>  {
       const token = jwt.sign({userId}, config.jwtSecret, {
           expiresIn: "120s"
       })

       return token;
    },
   
    verifyToken: (token) => {
       const decodedToken = jwt.verify(token, config.jwtSecret)
   
       return decodedToken
    },
   
    auth: (req, res, next) => {
       try {
           const bearerHeader = req.headers ["authorization"]
   
           const token = bearerHeader.split(" ")[1];
   
           const decodedToken = verifyToken(token)
   
           req.userId = decodedToken.userId;
           next();
       } catch (err) {
           responseHandle.unauthorized(res)
       }
   }
    
}
