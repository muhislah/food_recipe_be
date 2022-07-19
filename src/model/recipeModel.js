const pool = require('../config/db')

const addRecipe = ({id, title, image, ingredient, video, id_user}) => {
    console.log('adding some recipe')
    return pool.query(`INSERT INTO recipes (id, title, image, ingredient, video, id_user) values ('${id}','${title}', '${image}', '${ingredient}', '${video}', '${id_user}')`)
}
const getRecipeDetail = (id) => {
    console.log('searching detail ...')
    return pool.query(`SELECT * FROM recipes WHERE id = $1`,[id])
}
const getRecipe = ({search, orderby, order, limit, offset}) => {
    if (!search){
        return pool.query(`SELECT * FROM recipes ORDER BY ${orderby} ${order} LIMIT ${limit} OFFSET ${offset}`)
    }
    return pool.query(`SELECT * FROM recipes WHERE title ILIKE '%${search}%' ORDER BY ${orderby} ${order} LIMIT ${limit} OFFSET ${offset}`) 
}
const countData = (search) => {
    if (!search){
        return pool.query("SELECT COUNT(*) AS total FROM recipes")
    }
    return pool.query(`SELECT COUNT(*) AS total FROM recipes WHERE title ILIKE '%${search}%'`)
}
const updateRecipe = ({id, title, image, ingredient, video, id_user}) => {
    return pool.query("UPDATE recipes SET title = COALESCE($1, title), image = COALESCE($2, image), ingredient = COALESCE($3, ingredient), video = COALESCE($4, video), id_user = COALESCE($5, id_user), post_at = NOW() WHERE id = $6",[title, image, ingredient, video, id_user, id])
}
const deleteRecipe = (id) => {
    return pool.query(`DELETE FROM recipes WHERE id = $1`,[id])
}
const getRecipeUser = (id) => {
    console.log('searching Recipe from id')
    return pool.query(`SELECT * FROM recipes WHERE id_user = $1`,[id])
}

module.exports = { addRecipe, getRecipeDetail , getRecipe , countData , updateRecipe, deleteRecipe, getRecipeUser}
