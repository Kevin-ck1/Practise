## REACT

Note that react is a library not a framework

To install react locally, and create an app

```shell
npx create-react-app my-app
cd my-app
npm start
```



## Getting Started

Navigate to `src/App.js`, and delete the code inside to get the below code format which will be the starting point of the application. Note that the `App.js` will be the base component.

```react
function App(){
    return (
        <div className="container">
            
        </div>
    )
}

export default App
```

Note that a functional component returns one root element, hence rap the other elements in div or *<> </>*

Make sure to activate React Javascript for the Emmet in vscode



To test if the application is running, we can create the below code where we create variables outside the return and test if they are picked up inside the return expression

```react
function App(){
    const name = "Brad"
    const x = false
    
    return (
        <div className="container">
            <h1>Hello From {name}</h1>
            <h2>Present {x ? 'Yes': 'No'} </h2>
        </div>
    )
}

export default App
```

`{x ? 'Yes': 'No'} ` This is a ternary operator executed inside the component.

For the components that are to be created we are to house them inside a `components` folder under the `src` folder.

The first component in this case will be the `Header` component... To create it, inside the components folder, we create a file by the name `Header.js`

with vscode we can install ES7/React extension that provides snippets, for react elements. e,g  `rafce` creates a boiler plate of a react component.

Hence  the base code of a functional component is as shown below

```react
const Header = () => {
  return (
    <div>Header</div>
  )
}

export default Header
```

For the created component we will have to import it to the `App.js` component.

```react
import Header from "./components/Header"

function App(){
    const name = "Brad"
    const x = false

    return (
        <div className="container">
            <h1>Hello From {name}</h1>
            <h2>Present {x ? 'Yes': 'No'} </h2>
            <Header/>
        </div>
    )
}

export default App
```

To create a classed based component

```react
check code online
```



## Props

Used to propagate data from the parent to the child components, in this case we are to transmit data from the `App` to `Header` component. Props are transmitted in key value pairs, the name of the prop and the value of the prop. 

A Prop can be thought as a radio channel which is transmitting data from the parent to the child component. The name of the radio channel together with the message to be transmitted are set in the parent component, while the parent child would have listen for the name of the channel so as to receive the message.

In the example below, we are to send the data `Hello` from the App to the Header component, hence we are to transmit the data through a channel called `title` and in the Header component we will listen for `title`

```react
import Header from "./components/Header"

function App(){
    return (
        <div className="container">
            <Header title="Hello"/>
        </div>
    )
}

export default App
```

In the above we are sending `Hello` to the *Header* component, to receive the data we are to write the below code inside the *header* component;

```react
const Header = (props) => {
  return (
    <div>
        <h1>{props.title}</h1>
    </div>
  )
}

export default Header
```

Note that the function will receive the **props** as a parameter for the function, and retrieve the data we call `props.title`.

*** Default Props

Inside the child elements we can place default props, in that the defaults will be used if none are placed inside the parent, i.e

```react
import Header from "./components/Header"

function App(){
    return (
        <div className="container">
            <Header />
        </div>
    )
}

export default App
```

```react
const Header = (props) => {
  return (
    <div>
        <h1>{props.title}</h1>
    </div>
  )
}

Header.defaultProps = {
  title: 'Task Tracker'
}

export default Header
```

The above two illustrates the use of default props.

*** Cleaning the props code,

Instead of passing in the props into the function, we can directly pass the name of the props i.e

```react
const Header = ({title}) => {
  return (
    <div>
        {/* <h1>{props.title}</h1> */}
        <h1>{title}</h1>
    </div>
  )
}

Header.defaultProps = {
  title: 'Task Tracker'
}

export default Header
```



**Proptypes** - We can set the default type of the props to be passed, in this case we are to set the title prop to be a string, hence if we feed in a integer the code fails

```react
import PropTypes from 'prop-types'

// const Header = (props) => {
const Header = ({title}) => {
  return (
    <div>
        <h1>Task Tracker</h1> 
        {/* <h1>{props.title}</h1> */}
        <h1>{title}</h1>
    </div>
  )
}

Header.defaultProps = {
  title: 'Task Tracker'
}

Header.propTypes = {
  //title: PropTypes.string,
  title: PropTypes.string.isRequired,
}
export default Header
```



### Styling

#### Direct Css in JS

In react the code uses camel case for the css variables

```react
<h1 style={{color:'red', backgroundColor:'black'}} >{title}</h1>
```



Writing in the component

```react
const Header = ({title}) => {
  return (
    <div>
        <h1 style={headingStyle} >{title}</h1>
    </div>
  )
}

const headingStyle = {
  color:'red', 
  backgroundColor:'black'
}

export default Header
```

Other option for CSS is to place all the CSS inside the index.css file.



### Button Component

The button is to be a child of the header component

```react
const Button = ({color , text}) => {
  return (
    <button className='btn' style={{backgroundColor: color}}>{text}</button>
  )
}

export default Button
```

As for the `Header` component

```react
const Header = ({title}) => {
  return (
    <header className='header'>
      <h1>{title}</h1>
      <Button color='green' text="Add"></Button>
    </header>  
  )
}
export default Header
```

### Events

```react
import PropTypes from 'prop-types'
const onClick = () => {
    console.log('Click')
}
const Button = ({color , text}) => {
  return (
    <button onClick={onClick} className='btn' style={{backgroundColor: color}}>{text}</button>
  )
}

Button.defaultProps = {
    color: 'steelblue',
}

Button.propTypes = {
    text: PropTypes.string,
}
export default Button
```



### TAsks

Creating a tasks component, containing an array of variables.

```react
const tasks = [
    {
        id: 1,
        text: "Docs Appointment",
        day: "Feb 5th at 2:30",
        reminder: true,
    },

    {
        id: 2,
        text: "Meeting at School",
        day: "Feb 6th at 1:30PM",
        reminder: true,
    },

    {
        id: 3,
        text: "Shopping",
        day: "Feb 5th at 2:30",
        reminder: false,
    }

]

const Tasks = () => {
  return (
    <>
    {tasks.map((task)=>(<h3 key={task.id}>{task.text}</h3>))}
    </>
  )
}

export default Tasks
```

Note the arrow function on the above `{tasks.map((task)=>(<h3 key={task.id}>{task.text}</h3>))}`

In the above example the variables are placed outside the component.



### useState

In this case we are to house the list inside the component, hence the introduction of **useState**.

To incorporate **useState** we will first import it into the component. `import { useState } from "react"`

```react
import { useState } from "react"

const Tasks = () => {

    const [tasks, setTasks] = useState([
        {
            id: 1,
            text: "Docs Appointment",
            day: "Feb 5th at 2:30",
            reminder: true,
        },
    
        {
            id: 2,
            text: "Meeting at School",
            day: "Feb 6th at 1:30PM",
            reminder: true,
        },
    
        {
            id: 3,
            text: "Shopping",
            day: "Feb 5th at 2:30",
            reminder: false,
        }
    
    ])
    
  return (
    <>
    {tasks.map((task)=>(<h3 key={task.id}>{task.text}</h3>))}
    </>
  )
}

export default Tasks
```



To Change tasks, we will have to recreate it,, with the use of *setTasks*

`setTasks([...tasks, {newObject}])`



### Individual Task Component

```react
import {FaTimes} from "react-icons/fa"

const Task = ({task}) => {
  return (
    <div className="task">
        <h3>{task.text} <FaTimes style={{color: "red", cursor: 'pointer'}}/> </h3>
        <p>{task.day}</p>
    </div>
  )
}

export default Task
```



To install react icons as used in the code above run `npm i react-icons`, After installing restart the server.

To import the icons to the component

`import {FaTimes} from "react-icons/fa"`

### Delete Task

To delete a task the chain of delete will be `App => Tasks => Task`

In the App Component

```react
//Delete Tasks
    const deleteTask = (id) =>{
        console.log("Delete Task", id)

    }

    return (
        <div className="container">
            <Header/>
            <Tasks tasks={tasks} onDelete = {deleteTask}/>
        </div>
    )
```

In the Tasks component

```react
const Tasks = ({tasks, onDelete}) => {
  return (
    <>
    {tasks.map((task)=>(
    <Task  
        key={task.id} 
        task={task} 
        onDelete={onDelete}
    />))}
    </>
  )
}
```

In the task Component

```react
import {FaTimes} from "react-icons/fa"

const Task = ({task, onDelete}) => {
  return (
    <div className="task">
        <h3>{task.text} <FaTimes style={{color: "red", cursor: 'pointer'}} onClick={onDelete} /> </h3>
        <p>{task.day}</p>
    </div>
  )
}

export default Task
```

In the above, the event object will be passed onto the function to pass in the id specifically, we do as shown below

```react
<h3>{task.text} <FaTimes style={{color: "red", cursor: 'pointer'}} onClick={()=>onDelete(task.id)} />
```

To actually delete an item from the display, we use the function

```react
//Delete Tasks
    const deleteTask = (id) =>{
        //To delete the clicked item from the display
        setTasks(tasks.filter((task)=>task.id !== id ))//Takes only items with ids not similar to the one passed in
    }
```



### Optional Messaging

To display an option message incase of conditions with the use of ternary operator **?**.

```react
{tasks.length > 0 ? 
            (<Tasks tasks={tasks} onDelete = {deleteTask}/>) : 
            ('No Tasks to Show')}
```



### Toggle Task

We are to toggle the task upon doble click, also to show the change in task on the display, we are to use temple llitral on the class name 

```react
className={`task ${task.reminder ? 'reminder': ""}`}
```

 The propagation on the toggle

In the App component

```react
//Toggle Reminder
    const toggleReminder = (id)=>{
        setTasks(tasks.map((task)=> task.id === id? {...task, reminder: !task.reminder}: task))
    }

    return (
        <div className="container">
            <Header/>
            {tasks.length > 0 ? 
            (<Tasks tasks={tasks} onDelete = {deleteTask} onToggle={toggleReminder}/>) : 
            ('No Tasks to Show')}
        </div>
    )
```



On the Tasks Component

```react
const Tasks = ({tasks, onDelete, onToggle}) => {
  return (
    //setTasks([...tasks, {newObject}])
    <>
    {tasks.map((task)=>(
    <Task  
        key={task.id} 
        task={task} 
        onDelete={onDelete}
        onToggle = {onToggle}
    />))}
    </>
  )
}
```

On the Task Component

```react
const Task = ({task, onDelete, onToggle}) => {
  return (
    <div className={`task ${task.reminder ? 'reminder': ""}`} onDoubleClick={()=>onToggle(task.id)}>
        {/* <h3>{task.text} <FaTimes style={{color: "red", cursor: 'pointer'}} onClick={onDelete} /> </h3> */}
        <h3>
            {task.text} 
            <FaTimes style={{color: "red", cursor: 'pointer'}} onClick={()=>onDelete(task.id)} /> 
        </h3>
        <p>{task.day}</p>
    </div>
  )
}
```



### Form

To add and add task form, we will have to create its component

```react
import { useState } from "react"


const AddTask = ({onAdd}) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        if(!text){
            alert("Please Add a Task")
        }

        onAdd({text, day, reminder})
        setText('')
        setDay('')
        setReminder(false)
    }

  return (
    <form className="add-form" onSubmit={onSubmit}>
        <div className="form-control">
            <label >Tasks</label>
            <input type="text" name="" placeholder="Add Task" value={text} onChange={(e)=> setText(e.target.value)} />
        </div>
        <div className="form-control">
            <label >Day & Time</label>
            <input type="text" name=""  placeholder="Add Date" value={day} onChange={(e)=> setDay(e.target.value)}/>
        </div>
        <div className="form-control form-control-check">
            <label >Reminder</label>
            <input type="checkbox" checked={reminder} name="" value={reminder} onChange={(e)=> setReminder(e.currentTarget.checked)} />
        </div>

        <input type="submit" value="Save Task" className="btn btn-block" />
    </form>
    
  )
}

export default AddTask
```

In the component above, we will require 3 variables, the *text, day & reminder*, The variables are initialized using the **useState**

```react
const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)
```



The values for the variables are set directly from the input field, which listens for the onchange command.

`onChange={(e)=> setText(e.target.value)}` - to set the text variable

`onChange={(e)=> setDay(e.target.value)}` - to set the day

`onChange={(e)=> setReminder(e.currentTarget.checked)} ` - Not that the check box is targeted differently.



The submit of the form triggers the onSubmit, which triggers the `onAdd`, function sending the variables to the tasks variable.

```react
const onSubmit = (e) => {
        e.preventDefault()
        if(!text){
            alert("Please Add a Task")
        }

        onAdd({text, day, reminder})
        setText('')
        setDay('')
        setReminder(false)
    }
```



To add the new created task to the overall tasks, in the App component. 

```react
const addTask = (task) => {
        var id = tasks.slice(-1)[0].id //Creating an id for the new task
        const newTask = {id, ...task} // Combing the id to the new task
        setTasks([...tasks, newTask]) //Adding the newTask to the rest of the tasks
        
    }
```

Not that in the above, we are using the spread operator, `...` in the first instance it is used to add the **task** to the **id**, and in the second instance it is used to add the **newTask**, to the **tasks** array of objects, not that in this case they are rapped in **[]**



### Toggling form

In this part we will try to toggle the task form. The toggle is to be impleted with the use of the **Add** button.

To start with we are to toggle the form on true or false.

`{showAddTask && <AddTask onAdd={addTask}></AddTask>}` - In this code **&&**, is used a short hand ternary operator in the case where we only have one condition.

In the above code, the variable `showAddTask` is use to house the conditions.

To change the `showAddTask`, we will listen for a click event from `App => Header => Button`

`<Header onAdd={()=>{setShowAddTask(!showAddTask)}}/>` - On the App component.

`Button color='green' text="Add" onAdd ={onAdd} ></Button>` - On the header component

`<button onClick={onAdd} className='btn' style={{backgroundColor: color}}>{text}</button>` - on the button component.

To change the text and color of the button

We are to pass the value of the `showAddTask` from the App=>Header

`<Header onAdd={()=>{setShowAddTask(!showAddTask)}} showAddTask ={showAddTask}/>` - in the App Component

`<Button color={showAddTask ? "red" : "green"} text={showAddTask ? "Close" : "Add"} onAdd ={onAdd} ></Button>` - In the header component



### To Deploy, Build Static files

on the console `npm run build`

This creates a build folder for the files to be upload.

To check if the build files are working properly

First install the npm serve globally, by

`npm i -g serve`.

And to open the production files on a server 

`serve -s build -p 8000`



### Json Server

Creates a mock api server

To install it locally `npm i json-server`.

To be able to properly run it...in the `package.json` file, under the `scripts` add `"server": "json-server --watch db.json --port 5000"` - this runs the sever an creates a `db.json` file which acts as the database.

```json
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "server": "json-server --watch db.json --port 5000"
  },
```

To run the server

`npm run server`,

And also ` npm start`

Once everything is set, we are to use the **hook** `{useEffect}`, to import the data from the server.

To fetch data from the backend and set the `Tasks` variable

```react
useEffect(()=>{
        const fetchTasks = async () => {
            const res = await fetch('http://localhost:5000/tasks')
            const data = await res.json()
            //return data
            setTasks(data)
        }

        fetchTasks()
    }, [])
```

Note that in the above we can, redisign the code such the fetchTasks is outside the `useEffects`

```react
useEffect(()=>{
	const getTasks = async () => {
    	const tasks = await fetchTasks()
        setTasks(tasks)
    }
    getTasks()
}, [])

const fetchTasks = async () => {
	const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    	return data
}
```



#### Deleting, Adding, Get, Updating from server

TO delete

```react
//Delete Tasks
    const deleteTask = async (id) =>{
        //To delete the task from the server- this function will first be converted to an async function 
        await fetch(`http://localhost:5000/tasks/${id}`,{
            method: 'DELETE'
        })

        //To delete the clicked item from the display
        setTasks(tasks.filter((task)=>task.id !== id ))//Takes only items with ids not similar to the one passed in
    }
```



To add to the server

```react
//Add Tasks
    const addTask =  async (task) => {
        //To add to the back end
        const res = await fetch('http://localhost:5000/tasks',{
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        
        // To add it to the tasks 
        const data = await res.json()
        setTasks([...tasks, data])
    }

```

To get a task item

```react
const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`)
        const data = await res.json()
        return data
    }
```





To update a task

```react
//Toggle Reminder
    const toggleReminder = async (id)=>{
        const taskToToggle = await fetchTask(id)
        const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}
        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        })
        const data = await res.json()
        setTasks(tasks.map((task)=> task.id === id? {...task, reminder: data.reminder}: task))
    }
```



### Routing

To use routing, we use the package

`npm i react-router-dom`

In this case we are going to place the links below the page, in a footer component

```react
const Footer = () => {
  return (
    <footer>
        <p>Copyright &copy; 2022 </p>
        <a href="/about">About</a>
    </footer>
  )
}

export default Footer
```

As for the second page we will create its component

```react
const About = () => {
  return (
    <div>
        <h4>Version 1.0.0</h4>
        <a href="/">Go back</a>
    </div>
  )
}

export default About
```



To use routes on the `App Component`, import  `BrowserRouter, Route & Routes`

`import { BrowserRouter as Router, Route, Routes } from "react-router-dom"`. 

In this case we are to have two routes `/` and `/about`, hence the return of the App Component can be changed to 

```react
<Router>
    <div className="container">
        <Header onAdd={()=>{setShowAddTask(!showAddTask)}} showAddTask ={showAddTask}/>
        <Routes>
            <Route path = '/' excat element = 
                {
                    <>
                     {showAddTask && <AddTask onAdd={addTask}></AddTask>}
                     {tasks.length > 0 ?(<Tasks tasks={tasks} onDelete = {deleteTask} 								onToggle={toggleReminder}/>) : ('No Tasks to Show')}
                    </> 
                 } />
             <Route path='/about' element={<About />} ></Route>
         </Routes>
         <Footer />
     </div>
</Router>
```



Not that in the above, in `Route` is nested inside `Routes`.

To prevent the page from reloading, we can replace the `a` tag with `Link`, but to use link we will first have to import it `

```react
<Link to="/about">About</Link>

<Link to="/">Go back</Link>
```

 To remove the Button in the About page, We are to use conditions on the button depending on the location of the route, i.e to display it if the route is `/`, and vanish when the route is `/about`

Hence import location `import { useLocation } from 'react-router-dom'`, we are to place the condition in the Header Component

```React
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'

const Header = ({title, onAdd, showAddTask}) => {
  const  location = useLocation()
  return (
    <header className='header'>
      <h1>{title}</h1>
      {location.pathname === '/' && <Button color={showAddTask ? "red" : "green"} text=			{showAddTask ? "Close" : "Add"} onAdd ={onAdd} ></Button>}
    </header>
  )
}
```



