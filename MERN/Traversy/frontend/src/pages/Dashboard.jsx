import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import GoalForm from "../components/GoalForm"


const Dashboard = () => {
  //
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //get user variable from auth global 
  const {user} = useSelector((state)=> state.auth)
  
  //check if user is availble
  useEffect(()=>{
    if(!user){
      navigate('/login')
    }
  }, [user, navigate])

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm/>
    </>
  )
}

export default Dashboard