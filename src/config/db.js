// const { Pool } = require('pg')

// const pool = new Pool({
//     user : 'postgres',
//     host : 'localhost',
//     database : 'food_recipe',
//     password : 'toor',
//     port : '5432'
// })


// module.exports = pool

const connectionString = 'postgres://svjfakuvthvbag:433643c4f5c13cba50ff9d59198aab2eb2dfc50a98a168107604f0d955e9fed5@ec2-44-206-11-200.compute-1.amazonaws.com:5432/da44vr2dnf9l66'
const { Pool } = require('pg')
const pool = new Pool({
  connectionString: connectionString,
  ssl: { rejectUnauthorized : false }
})

module.exports = pool
