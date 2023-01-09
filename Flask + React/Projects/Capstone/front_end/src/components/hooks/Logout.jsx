import { useContext } from 'react'
import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthProvider'

const Logout = () => {
    const navigate = useNavigate()
    
    const {setAuth} = useContext(AuthContext)

    const logout = async()=>{
        setAuth({});
        const res = await fetch('/logout')
        
        if(res.status == 200){
            localStorage.clear()
            navigate('/')
        } else {
            console.log("Login UnSuccessfull")
        }
    }
    
    return logout;
}

export default Logout