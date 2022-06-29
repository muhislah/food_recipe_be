const pool = require('../config/db')

const getProfile = ({id}) => {
    return pool.query('SELECT * FROM users WHERE id=$1', [id])
}

module.exports = {
    getProfile
}