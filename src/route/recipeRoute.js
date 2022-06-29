const express = require('express')
const { addRecipe, getRecipe, updateRecipe, deleteRecipe } = require('../controller/recipeController')
const { auth } = require('../middleware/auth')
const { upload } = require('../middleware/cloudinaryUpload')
const router = express.Router()

router
    .get('/:id?', getRecipe)
    .post('/add', upload, auth,  addRecipe )
    .put('/:id', upload, auth , updateRecipe )
    .delete('/:id' , auth  , deleteRecipe )

module.exports = router