# MERN

It involves , Mongo DB, Express JS, React, Node JS

The backend will use **express** and **node**.

## Express

To setup the express

* Setup the file structure => backend => sever.js

* created the **package.json** file inside the backend folder, by running

  ```shell
  npm init -y
  ```

* Install express package used to create the express app

  ```shell
  npm install express
  ```



To create an app instance

```js
const express = require('express')

//Express app
const app = express()

//Listen for requests
app.listen(4000, () =>{
    console.log('Listing on port 4000');
})
```

To confirm if the app is created, we run

```shell
node server.js
```

Note that the above will run the server once, in order to capture changes live, we will use `nodemon`.

```shell
npm install -g nodemon
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
    "dev": "nodemon server.js"
  },
```

This will enable us to use the below command

```shell
npm run dev
```



To handle routes...

```js
//Route handler
app.get('/', (req, res)=>{
    res.json({msg: "Welcome to the App"})
})
```



To create an environment variables

* Make sure you have the .env package `npm install dotenv`

* create a **.env** file under the backend folder

* inside the file place the env variable inside

* To incorporate the env variables to the code

  ```js
  require('dotenv').config()
  
  //Listen for requests
  app.listen(process.env.PORT, () =>{
      console.log('Listening on port 4000!');
  })
  ```

* `process.env.PORT`

We can add a middleware to log out the requests that are coming in

```js
//Middleware - To log request path and request method
app.use((req, res, next)=>{
    console.log(req.path, req.method)
    next()
})
```

Note that in the above, the middleware accepts **request, res, next**. the **next** function enables us to continue to the rest of the code.

