const { verifyJWT } = require("../helper/jwt")
const response = require("../helper/response")
const createError = require('http-errors')

module.exports.auth = async (req, res, next) => {
    try {
        if (req.cookies){
            const token = req.cookies.token
            console.log('this is token = '+token)
            const payload = await verifyJWT(token)
            req.payload = payload
            next()
        }else {
            response(res, [] , 200, "SERVER NEED TOKEN")
        }
    } catch (error) {
        console.log(error)
        if(error && error.name === 'JsonWebTokenError'){
            next(createError(400, 'token invalid'))
        }else if(error && error.name === 'TokenExpiredError'){
            next(createError(400, 'token expired'))
        }else{
            next(createError(400, 'Token not active'))
        }
    }
    
}