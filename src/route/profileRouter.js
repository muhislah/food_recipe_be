const express = require('express')
const { getProfie, getRecipebyProfile } = require('../controller/profileController')
const { auth } = require('../middleware/auth')
const router = express.Router()

router
    .get('/', auth,  getProfie)
    .get('/recipes', auth,  getRecipebyProfile)

module.exports = router