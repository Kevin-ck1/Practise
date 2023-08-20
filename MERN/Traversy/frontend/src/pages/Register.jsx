import { useEffect, useState } from "react"
import { FaUser } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { register, reset } from "../features/auth/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"


const Register = () => {
  //Form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  //Destructuring the form data
  const {name, email, password, password2} = formData

  //
  const navigate = useNavigate()
  const dispatch = useDispatch()

  //Retrieving the global auth variables
  const {user, isLoading, isError, isSuccess, message} = useSelector(
    (state)=>state.auth
  )

  useEffect(()=>{
    if(isError){
      toast.error(message)
    }

    if(isSuccess){
      navigate('/')
    }
    dispatch(reset())
  }, [user, isError, isSuccess, message])

  //Updating the values of the formData
  const onChange = (e)=>{
    setFormData((prevState)=>({
      ...prevState, [e.target.name] : e.target.value,
    }))
  }

  //Submit handle
  const onSubmit = async(e)=>{
    e.preventDefault()
    if(password !== password2){
      alert('Passwords do not match')
    }else{
      dispatch(register(formData))
    }
  }

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