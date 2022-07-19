const express = require('express')
const { getProfie, getRecipebyProfile } = require('../controller/profileController')
const router = express.Router()

router
    .get('/', getProfie)
    .get('/recipes', getRecipebyProfile)

module.exports = router