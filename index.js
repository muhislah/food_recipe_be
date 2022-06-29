require('dotenv').config()
const express = require('express')
const response = require('./src/helper/response')
const recipeRouter = require('./src/route/recipeRoute')
const userRouter = require('./src/route/userRoute')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { none } = require('./src/middleware/upload')
const profileRouter = require('./src/route/profileRouter')


app.use(cookieParser())
app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000',
        sameSite : none
    })
)
app.use(express.json())
app.use(morgan('dev'))

app.use('/auth', userRouter)
app.use('/recipe', recipeRouter)
app.use('/profile', profileRouter)

app.use((err, req, res, next) => {
    return response(res, [], 200, err.message)
})
app.use((req,res) => {
    return response(res, [], 300, 'PAGE NOT FOUND')
})


app.listen(process.env.PORT, () => {
    console.log('server running on port 5000')
})