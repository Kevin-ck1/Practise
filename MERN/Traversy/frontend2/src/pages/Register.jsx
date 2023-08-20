import { useEffect, useState } from "react"
import { FaUser } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { register, reset } from "../features/auth/authSlice"
import {useDispatch, useSelector} from 'react-redux'
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"


function Register() {
  //Form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  //destructuring the form data
  const {name, email, password, password2} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  //Loading the global variables using useSelector
  const {user, isLoading, isError, isSuccess, message} = useSelector(
    (state)=> state.auth
  )

  useEffect(()=>{
    if (isError){
      toast.error(message)
    }

    if(isSuccess){
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message])


  //Updating the value of the formData
  const onChange =(e) =>{
    setFormData((prevState) =>({
      ...prevState, 
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = async (e) =>{
    e.preventDefault()
    // console.log(formData)
    if(password !== password2){
      alert('Passwords do not match')
    }else{
      dispatch(register(formData))
    }
  }
  /*
  //Register function using fetch
  const register = async()=>{
    const res = await fetch('/api/users/',{
      method: "POST",
      headers:{
        'Content-type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    return res.json()
  }


 const API_URL = "/api/users/"
 const register = async () =>{
  try {
    const res = await axios.post(API_URL, formData)

    console.log(res)
    console.log(res.data)
    console.log("Break")
    if(res.data){
      localStorage.setItem('user', JSON.stringify(res.data))
    }

    return res.data
  } catch (error) {
    // console.log(error.stack)
    console.log(error)
    return error.message
  }
  
 }
*/

 if(isLoading){
  return <Spinner/>
 }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser/> Register
        </h1>
        <p>Please Create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input 
              type="text" 
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              // onChange={(e)=> onChange(e)}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input 
              type="email" 
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              // onChange={(e)=> onChange(e)}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Confirm password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register