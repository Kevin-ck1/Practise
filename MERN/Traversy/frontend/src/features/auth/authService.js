import axios from "axios"

//Defining the API route
const API_URL = '/api/users/'

//Register function
const register = async(data) =>{
    const res = await axios.post(API_URL, data)

    if(res.data){
        localStorage.setItem('user', JSON.stringify(res.data))
    }

    return res.data
}

//Login function
const login = async(data)=>{
    const res = await axios.post(`${API_URL}login`, data)

    if(res.data){
        localStorage.setItem('user', JSON.stringify(res.data))
    }

    return res.data
}

//Logout
const logout = ()=>{
    localStorage.removeItem('user')
}

const authService = {
    register,
    login,
    logout
}

export default authService