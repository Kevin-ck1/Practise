//requirements
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

//creating the function
const protect = asyncHandler(async(req, res, next)=>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //Get token
            token = req.headers.authorization.split(' ')[1]

            //Verify the token - Decode the token to get id object
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //Get user from the token, and attach it to the request object
            req.user = await User.findById(decoded.id).select('-password') //The select keyword will remove the password 

            next() // To continue to function

        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = { protect }