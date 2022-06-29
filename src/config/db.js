const { Pool } = require('pg')

const pool = new Pool({
    user : 'postgres',
    host : 'localhost',
    database : 'food_recipe',
    password : 'toor',
    port : '5432'
})


module.exports = pool
