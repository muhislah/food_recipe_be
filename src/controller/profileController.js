const createError = require('http-errors');
const { verifyJWT } = require('../helper/jwt');
const response = require('../helper/response');
const { getProfile } = require('../model/profileModel');
const { getRecipeUser } = require('../model/recipeModel');

module.exports.getProfie = async (req, res, next) => {
    try {
        const { token } = req.cookies
        const payload = await verifyJWT(token)
        const { rows : [data]}= await getProfile(payload)
        await delete data['password']
        return response(res, data, 200, "get profile success")
    } catch (error) {
        console.log(error)
    }
}
module.exports.getRecipebyProfile = async (req, res, next) => {
    try {
        const { token } = req.cookies
        const payload = await verifyJWT(token)
        const { rows : [data]}= await getProfile(payload)
        const { rows } = await getRecipeUser(data.id)
        return response(res, rows , 200, "get profile success")
    } catch (error) {
        console.log(error)
    }
}