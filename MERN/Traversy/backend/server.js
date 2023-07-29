//Importing express and env

const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()

const app = express()

//routes 
/*
//Testing the res.send
app.get('/', (req, res)=>{
    res.send("Get Goals")
})

//Testing the res.json
app.get('/', (req, res)=>{
    res.json({text : "Get Goals"})
})


//Testing the res.status.json i.e adding custom status
app.get('/', (req, res)=>{
    res.status(200).json({text : "Get Goals"})
})

*/

// The below two middleware are used to receive body data
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Incorporating the goalRoutes.js
app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

//To override the default express error handler
app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`)
})

