const express = require('express') //Bringing express
const router = express.Router() //Importing router from express
const {getGoals, setGoal, updateGoal, deleteGoal} = require('../controllers/goalController')
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getGoals).post(protect, setGoal)
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal)

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