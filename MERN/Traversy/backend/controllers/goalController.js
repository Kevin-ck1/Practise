const { error } = require("console")

/*
Description - Get goals
Route - GET /api/goals
Access - Private
*/
const getGoals = (req, res) =>{
    res.status(200).json({text : "Get Goals"})
}

/*
Description - Post goal
Route - POST /api/goals
Access - Private
*/
const setGoal =  (req, res)=>{
    if(!req.body.text){
        //res.status(400).json({text: "Please add a text field"})
        res.status(400)
        throw new Error('Please Add a Text Field')
    }
    
    res.status(200).json({text : "Set Goal"})
}

/*
Description - Update goal
Route - PUT /api/goals/:id
Access - Private
*/
const updateGoal = (req, res)=>{
    res.status(200).json({text : `Goal: ${req.params.id} updated`})
}

/*
Description - Delete goal
Route - DELETE /api/goals/:id
Access - Private
*/
const deleteGoal = (req, res)=>{
    res.status(200).json({text : `Goal: ${req.params.id} deleted`})
}

//To export the function
module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}