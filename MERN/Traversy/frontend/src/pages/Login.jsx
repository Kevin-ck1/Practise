import { useEffect, useState } from "react"
import { FaSignInAlt } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { login, reset } from "../features/auth/authSlice"
import Spinner from "../components/Spinner"


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  //Destructuring the formData
  const {email, password} = formData

  //
  const navigate = useNavigate()
  const dispatch = useDispatch()

  //Retrieving the global auth data
  const {isError, isSuccess, isLoading, message, user} = useSelector(
    (state)=>state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit =(e)=>{
    e.preventDefault()
    dispatch(login(formData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt/> Login
        </h1>
        <p>Login and start setting goals</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input 
              type="email" 
              className="form-control"
              name="email" 
              id="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange} 
            />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              className="form-control"
              name="password" 
              id="password"
              value={password}
              placeholder="Enter your password"
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

export default Login