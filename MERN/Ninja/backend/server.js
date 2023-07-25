require('dotenv').config()
const express = require('express')

//Express app
const app = express()

//Middleware - To log request path and request method
app.use((req, res, next)=>{
    console.log(req.path, req.method);
    next();
})

//Route handler
app.get('/', (req, res)=>{
    res.json({msg: "Welcome to the App"})
})

//Listen for requests
app.listen(process.env.PORT, () =>{
    console.log('Listening on port 4000!');
})


