const express = require('express') //Bringing express
const router = express.Router() //Importing router from express
const {getGoals, setGoal, updateGoal, deleteGoal} = require('../controllers/goalController')
const route = require('color-convert/route')

router.route('/').get(getGoals).post(setGoal)
router.route('/:id').put(updateGoal).delete(deleteGoal)

/*
router.get('/', getGoals)

router.post('/', setGoal)

router.put('/:id', updateGoal)

router.delete('/:id', deleteGoal)

*/

/*
router.get('/', (req, res)=>{
    res.status(200).json({text : "Get Goals"})
})

router.post('/', (req, res)=>{
    res.status(200).json({text : "Set Goal"})
})

router.put('/:id', (req, res)=>{
    res.status(200).json({text : `Goal: ${req.params.id} updated`})
})

router.delete('/:id', (req, res)=>{
    res.status(200).json({text : `Goal: ${req.params.id} deleted`})
})
*/

module.exports = router