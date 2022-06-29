const express = require('express')
const { getProfie } = require('../controller/profileController')
const router = express.Router()

router
    .get('/', getProfie)

module.exports = router