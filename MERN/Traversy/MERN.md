# MERN

## Express + Node

Setting up the file structure

The backend files are to be located inside the backend folder and init we house the **server.js** file.

We will then setup **node**, in the root directory

```shell
npm init -y
```

Setting up the express, env, mongoose, color

```shell
npm i express dotenv mongoose color
```

To run the server in developer mode we will have to install **nodemon**

```shell
npm install -D nodemon
```

Then to run the server live i.e in development mode

```shell
nodemon server.js
```

We can add the above to our scripts in the **package.json** file

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js",
    "server": "nodemon server.js"
  },
```

This will enable us to use the below command

```shell
npm run server
```

Setting-up the server.js

```js
//Importing express and env

const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

const app = express()

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`)
})
```



### Routes

To setup routes, we can use three different configurations.

* 1st config => The path and logic are available in the same function

  ```js
  app.get('/', (req, res)=>{
      res.send("Get Goals")
  })
  
  //Sending json as response
  app.get('/', (req, res)=>{
      res.json({text : "Get Goals"})
  })
  
  //Adding  custom status instead of the default
  app.get('/', (req, res)=>{
      res.status(200).json({text : "Get Goals"})
  })
  ```

* 2nd - Config => Placing the routes inside a routes folder, to declutter the server.js file

  * We will create the goalRoutes.js file to house the routes

    ```js
    router.get('/', (req, res)=>{
        res.status(200).json({text : "Get Goals"})
    })
    ```

    Note that in the above, we have changed `app` to `router`, 

  * The above can be treated as a middle ware, and to access it from our main server.js, we will use the below code

    ```js
    //Incorporating the goalRoutes.js
    app.use('/', require('./routes/goalRoutes'))
    ```

* 3rd - Config => Shorthand syntax for the routes function. We can combine get and post routes and also put and delete request, this is possible since they have the same route path

  ```js
  router.route('/').get(getGoals).post(setGoal)
  router.route('/:id').put(updateGoal).delete(deleteGoal)
  ```

  Check the below controller to understand the above code.

### Controller

The controllers are files that are used to house the functionality of the application.

Under the backend folder create the **controllers** folder and under it the **goalController.js**

```js
const getGoals = (req, res) =>{
    res.status(200).json({text : "Get Goals"})
}

//To export the function
module.exports = {
    getGoals
}
```

To use the above function into the **goalRoutes.js**

```js
const {getGoals} = require('../controllers/goalController')

router.get('/', getGoals)

router.put('/:id', updateGoal)
```

Note that we can combine similar routes to be as followers

```js
router.route('/').get(getGoals).post(setGoal)
router.route('/:id').put(updateGoal).delete(deleteGoal)
```



### Accepting Body Data

To accept body data we will have to incorporate several middlewares to our **server.js**

```js
app.use(express.json())
app.use(express.urlencoded({extended: false}))
```

To receive data inside the **goalController.js

```js
req.body
```



### Error Handling

For handling errors we can use the default express error handler, In a scenario where we expert a text field in a post request, we can handle the error as shown.

```js
const setGoal =  (req, res)=>{
    if(!req.body.text){
        //res.status(400).json({text: "Please add a text field"})
        res.status(400)
        throw new Error('Please Add a Text Field')
    }
    res.status(200).json({text : "Set Goal"})
}
```

To create a custom errorHandler, we will create is as a middleware

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

TO incorporate the above, errorHandler middleware, we import it below the routes in our **server.js** file.

```js
const {errorHandler} = require('./middleware/errorMiddleware')
.
.
.
app.use(errorHandler)
```

