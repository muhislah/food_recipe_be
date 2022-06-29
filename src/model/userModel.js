const pool = require('../config/db')

const registerUser = ({id, fullname, email, password, phone, photo}) => {
    console.log('registering user...')
    return pool.query(`INSERT INTO users (id, fullname, email, password, phone, photo) values ('${id}','${fullname}', '${email}', '${password}', '${phone}', '${photo}')`)
}

const searchUser = (email) => {
    console.log('searching users...')
    return pool.query(`SELECT * FROM users WHERE email = '${email}'`)
}

module.exports = {
    registerUser,
    searchUser
}