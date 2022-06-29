const cloudinary = require('cloudinary').v2
const { cloudinaryConfig } = require('../config/cloudinary')
var fs = require("fs");
const { v4 : uuid} = require('uuid');
const { addRecipe, getRecipe, getRecipeDetail, countData, updateRecipe, deleteRecipe } = require('../model/recipeModel');
const response = require('../helper/response');
const createError = require('http-errors');
const { destroyer } = require('../middleware/destroyer');

module.exports.addRecipe = async (req, res, next) => {
    try {
        const { image : [image]  , video : [video]  } = req.files
        const { title, ingredient } = req.body
        const { id } = req.payload
        const recipe = {}
        recipe.id = uuid()
        recipe.title = title
        recipe.image = image.path
        recipe.ingredient = JSON.stringify(ingredient.split(','))
        recipe.video = video.path
        recipe.id_user = id
        const { rowCount } = await addRecipe(recipe)
        if(!rowCount) {
            return response(res, [], 500, 'INSERT TO DATABASE FAILED')
        }
        response(res, recipe, 200, 'INSERT SUCCESS')
    } catch (error) {   
        next(createError.InternalServerError())
    }
}

module.exports.getRecipe = async (req, res, next) => {
    const id = req.params.id
    if (!id) {
        try {
            const search = req.query.search || undefined
            const orderby = req.query.sortby || "id"
            const order = req.query.sort || "ASC"
            const limit = +req.query.limit || 5
            const page = +req.query.page || 1
            const offset = (page - 1) * limit
            const { rows : [{ total }]} = await countData(search)
            const { rows } = await getRecipe({search, orderby, order, limit, offset})
            const pagination = {
                totalData : +total,
                totalPage : Math.ceil(total/limit),
                page : page,
                limit : limit
            }
            return response(res, rows, 200, "GET DATA SUCCESS", pagination, search)
        } catch (error) {
            console.log(error)
            console.log("Error Getting data From Database")
            return response(res, null, 500, "GET DATA FAILED")
        }
    }
    try {
        const { rows, rowCount } = await getRecipeDetail(id)
        if (!rowCount){
            return response(res, rows, 200, "NO DATA WITH THAT ID")
        }
        const ingredient = JSON.parse(rows[0].ingredient)
        rows[0].ingredient = ingredient
        const data = [...rows]
        response(res, data, 200, "GET DETAIL DATA SUCCESS")
    } catch ( error ) {
        console.log(error)
        return next(createError(400, "GET DATA FAILED"))
    }
}

module.exports.updateRecipe = async (req, res, next) => {
    try {
        const id = req.params.id
        const { image , video } = req.files
        const { title, ingredient } = req.body
        console.log(req.payload)
        const { id : id_user } = req.payload
        const recipe = {}
        recipe.id = id
        recipe.title = title ? title : null
        recipe.image = image ? image[0].path : null
        recipe.ingredient = ingredient ? JSON.stringify(ingredient?.split(',')) : null
        recipe.video = video ? video[0].path : null
        recipe.id_user = id_user
        console.log(recipe)    
        const { rowCount } = await updateRecipe(recipe)
        if(!rowCount) {
            return response(res, [], 500, 'UPDATE TO DATABASE FAILED')
        }
        response(res, recipe, 200, 'UPDATE SUCCESS')
    } catch (error) {   
        console.log(error)
        next(createError.InternalServerError())
    }
}

module.exports.deleteRecipe = async(req, res, next) => {
    try {
        const id = req.params.id
        // get item for deleting
        const { rows } = await getRecipeDetail(id)
        const image = (rows[0].image).split('/')[8].split('.')[0]
        const video = (rows[0].video).split('/')[8].split('.')[0]
        await destroyer('nono/'+image, "image")
        await destroyer('nono/'+video, "video")
        // end of deleting in cloudinary
        const { rowCount } = await deleteRecipe(id)
        if (!rowCount){
            return response(res, [], 500, "FAILED DELETE DATA")
        }
        response(res, [], 200, "SUCCESS DELETE DATA")
    } catch (error) {
        console.log(error)
        next(createError.InternalServerError())
    }
}