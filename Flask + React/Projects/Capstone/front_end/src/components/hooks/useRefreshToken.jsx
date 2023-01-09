import { useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import AuthContext from "../../context/AuthProvider"

const useRefreshToken = () => {
    const {auth, setAuth} = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()

    const refresh = async()=>{
        const res = await fetch('/refresh', {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                'Authorization':`Bearer ${auth.refresh_token}`
            },
            
        })
        if(res?.status != 200){
            navigate('/login', { state: { from: location }, replace: true });
            setAuth({})
            localStorage.clear()
        }else {
            const res_data = await res.json()
            setAuth(prev=>{
                // console.log(JSON.stringify(prev));
                // console.log(res_data)
                return {...prev, access_token:res_data.token}
            })

            
            return res_data.token

        }
    }
    localStorage.setItem("auth", JSON.stringify(auth))

    return refresh
}

export default useRefreshToken