//This file will containg the register, login and logout function
import axios from "axios";

//Defining the API route
const API_URL = '/api/users/'
/*
const register = async(formData)=>{
    const res = await fetch(API_URL,{
      method: "POST",
      headers:{
        'Content-type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    //Saving the response to the local storage
    const res_data = await res.json()

    if(res.ok){
      localStorage.setItem('user', JSON.stringify(res_data))
      // console.log(res_data)
    }

    // console.log(res_data)
    res.data = res_data
    return res
  }

*/
// /*

 const register = async (formData) =>{
  const res = await axios.post(API_URL, formData)
  
  if(res.data){
    localStorage.setItem('user', JSON.stringify(res.data))
  }
  
  return res.data
 }

// */

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