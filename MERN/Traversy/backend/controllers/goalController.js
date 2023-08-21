const aysncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')

/*
Description - Get goals
Route - GET /api/goals
Access - Private
*/
const getGoals = aysncHandler(async (req, res) =>{
    //bring in the goals for a specific user
    const user = req.user.id // obtaining user id from the req object
    const goals = await Goal.find({user})

    res.status(200).json(goals)
})

/*
Description - Post goal
Route - POST /api/goals
Access - Private
*/
const setGoal =aysncHandler(async  (req, res)=>{
    console.log(!false)
    if(!req.body.text){
        //res.status(400).json({text: "Please add a text field"})
        res.status(400)
        throw new Error('Please Add a Text Field')
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id 
    })
    
    res.status(200).json(goal)
})

/*
Description - Update goal
Route - PUT /api/goals/:id
Access - Private
*/
const updateGoal =aysncHandler(async (req, res)=>{
    //find goal in db
    const goal = await Goal.findById(req.params.id)
    
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }


    //Check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //Comparing the goal uuser and the goal user
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not Authorized')
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

    //Check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //Comparing the goal uuser and the goal user
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not Authorized')
    }

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