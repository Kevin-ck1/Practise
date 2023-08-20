## Node + Express 

The backend can be split into 4 files

`server.js` => `routes.js` => `controller.js` => `models.js`

Where;

* server.js => This is the entry point
* routes.js => contains the url paths
* constroller.js => contains the functionality of the application
* models.js => contains the model of the application

The required libraries

```shell

```



Below are boiler plates;

### Model.js

```js
//Requirements
const mongoose = require('mongoose') //importing mongoose

//Initialising the schema
const goalSchema = mongoose.Schema({
    //Inputing the required fields e.g user & text
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    
    text : {
        type: String,
        required: [true, 'Please add a text value']
    }
},{
    timestamps: true, // Creates the timestamps
})

//Exporting the Model e.g the Goal model
module.exports = mongoose.model('Goal', goalSchema)


/*
Notes
The method of exporting is different with that of controller and routes
```





## controller.js

```js
//Requirements
const aysncHandler = require('express-async-handler') //helps with catching errors in async calls i.e allows use of *throw*
const Goal = require('../models/goalModel') //Importing the Goal model into our cotroller.

/*
Description - Get goals
Route - GET /api/goals
Access - Private
*/
const getGoals = aysncHandler(async (req, res) =>{
    //bring in the goals
    const goals = await Goal.find()
    res.status(200).json(goals)
})

/*
Description - Post goal
Route - POST /api/goals
Access - Private
*/
const setGoal =aysncHandler(async  (req, res)=>{
    //To catch errors
    if(!req.body.text){
        res.status(400)
        throw new Error('Please Add a Text Field')
    }

    const goal = await Goal.create({
        text: req.body.text
    })
    
    res.status(200).json(goal)
})

/*
Description - Update goal
Route - PUT /api/goals/:id
Access - Private
*/
const updateGoal =aysncHandler(async (req, res)=>{
    //validating id
    /*
    const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
    	return res.status(404).json({error: 'No such workout'})
  	}
  	*/
    
    //find goal in db
    const goal = await Goal.findById(req.params.id)
    
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
    })

    res.status(200).json(updatedGoal)
})

/*
Description - Delete goal
Route - DELETE /api/goals/:id
Access - Private
*/
const deleteGoal =aysncHandler(async (req, res)=>{
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    console.log(goal)

    await goal.deleteOne();

    res.status(200).json({id : `${req.params.id}`})
})

//To export the function
module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}


/*
Notes
* aysncHandler => it is a library that helps with the catching of error in async function. Since we are using *async* in our functions, istead of using the normal *try{}catch{}*, the asyncHandler, allows us to use throw... check above code for example.

* After importing the model to the controller, it is attached to various methods... check the documentation for the various methods attached to the models.
Examples include ==> `.find(), .create(), .findById(), .findByIdAndUpdate()`

* Also point to note, the functions receive two arguments, the `res and req`, 
```



### routes.js

```js
const express = require('express') //Bringing express
const router = express.Router() //Importing router from express
const {getGoals, setGoal, updateGoal, deleteGoal} = require('../controllers/goalController') //Bringing in the functions from the controller.

router.route('/').get(getGoals).post(setGoal)
router.route('/:id').put(updateGoal).delete(deleteGoal)


//Exporting the router i.e routes object
module.exports = router
```



### server.js

```js
//Requirements
const express = require('express') //Import express into our app
const colors = require('colors')//Not necessarry - used to pretify the console logs
const dotenv = require('dotenv').config() // import lib for access of .env
const {errorHandler} = require('./middleware/errorMiddleware') // importing our costome made middleware
const connectDB = require('./config/db') //Import the db to the app
const port = process.env.PORT || 5000 //import variable from the .env file

connectDB() //Connecting to the database

const app = express() //Create our app instance

// The below two middleware enable the app to read request data i.e url
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Incorporating the routes to the application
app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

//To override the default express errorhandler
app.use(errorHandler) // Custom middleware

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`)
})

/*
Notes
* Database:
	- const connectDB = require('./config/db')  == We first import the database function 
	- connectDB -- Then we call the function to initialise our db
	
* .env variables
	- const dotenv = require('dotenv').config() == First we config the dotenv lib
	- process.env.<nameOfVariable>   == This is the syntax for access the variables
	
* errorHandler(MiddleWare)
	- const {errorHandler} = require('./middleware/errorMiddleware')
	- app.use(errorHandler) -- Note we call it after our routes

```



 ### db.js

```js
const { Console } = require('console')
const mongoose = require('mongoose') //Import mongoose a Mongo DB framework think of it as sqlachemy in flask

const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch(error) {
        console.log(error)
        process.exit(1)
    }
}

//Exporting our function
module.exports = connectDB

/*
Not that in the above since we are not using the asyncHandeler - we use the try{} catch{}
```



### errorMiddleWare.js

```js
const errorHandler = (err, req, res, next)=>{
    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode)

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null: err.stack
    })
}

module.exports = {
    errorHandler
}
```





