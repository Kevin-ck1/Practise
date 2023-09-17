import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import GoalForm from "../components/GoalForm"
import { toast } from "react-toastify"
import GoalItem from "../components/GoalItem"
import { getGoals, reset } from "../features/goals/goalSlice"
import Spinner from "../components/Spinner"

const Dashboard = () => {
  //
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //get user variable from auth global 
  const {user} = useSelector((state)=> state.auth)
  
  //Getting goal global state vairables
  const {goals, isLoading, isError, message} = useSelector((state)=>state.goals)

  //check if user is availble
  useEffect(()=>{
    

    if(isError){
      console.log(message)
      toast.error(message)
    }

    if(!user){
      navigate('/login')
      return
    }

    

    //Fetching the goal items
    dispatch(getGoals())

    
    //Reverting the goals state to the default after mounting
    return()=>{
      dispatch(reset())
    }
  }, [user, isError, message, navigate])

  if (isLoading){
    return <Spinner/>
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm/>

      <section className="content">
        {
          goals.length > 0 ? (
            <div className="goals">
              {goals.map((goal)=>(
                <GoalItem key={goal._id} goal={goal}/>
              ))}
            </div>
          ):(
            <> Hello </>
          )
        }
      </section>
    </>
  )
}

export default Dashboard