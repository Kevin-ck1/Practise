const jwt = require('jsonwebtoken')
const bcyrpt = require('bcryptjs')
const asyncHandler = require("express-async-handler")
const User = require('../models/userModel')


/*
Description - Register user
Route - POST /api/users
Access - Public
*/
const registerUser = asyncHandler(
    async (req, res) =>{
        //Retrieving request data
        const {name, email, password } = req.body

        //Validating availabity of the fields
        if(!name || !email || !password){
            res.status(400)
            throw new Error('Please add all fileds')
        }

        //Check if user exists
        const userExists = await User.findOne({email}) //Not finOne receives a object as argument
        if(userExists){
            res.status(400)
            throw new Error('User already exists')
        }

    

        //Encrypt password - Not to functions are async
        const salt = await bcyrpt.genSalt(10) //generate random data value to attach to password to increase security
        const hashedPassword = await bcyrpt.hash(password, salt)

        //Create User object
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        //if creation is a go
        if(user){
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token :generateToken(user.id)
            })
        }else{
            res.status(400)
            throw new Error('Invalid user data')
        }

    }
)

/*
Description - Login/Authenticate User
Route - POST /api/users/login
Access - Public
*/
const loginUser = asyncHandler(
    async(req, res)=>{
        //Retrieve body data
        const {email, password} = req.body
        // console.log({...{email}, ...{password}}) //spread operator practise
        //Validating availabity of the fields
        if(!email || !password){
            res.status(400)
            throw new Error('Please add all fileds')
        }

        //Search user with the email
        const user = await User.findOne({email})
        
        //check if user exists and password given match with that in db
        if(user && (await bcyrpt.compare(password, user.password))){
            res.json({
                id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user.id)
            })
        } else {
            res.status(400)
            throw new Error('Invalid Credentials')
        }
        

    }
)


/*
Description - Get user Data
Route - POST /api/users/me
Access - Private
*/
const getMe = asyncHandler(async(req, res)=>{
    //Since from the auth middleware we have attached the user to the req
    //To obtain the user
    console.log(req.user)
    res.status(200).json(req.user)
    
})

//Generate JWT
const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}