import { useContext, useRef, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import useRefreshToken from "../hooks/useRefreshToken";


const Users = () => {
  const [users, setUsers] = useState('');
  const {auth} = useContext(AuthContext)
  const usersRef = useRef("")

  const refresh = useRefreshToken();

  const fetchFunction = async(a)=>{
    const res = await fetch('/getUsers', {
      method: "GET",
      headers: {
          'Content-type': 'application/json',
          'Authorization':`Bearer ${a}`
      },
    });

    try {
      const res_data = await res.json()
      usersRef.current = res_data
      setUsers(usersRef.current)
    } catch (error) {
      console.log(error)
    }

    return res
  }

  useEffect(() => {
    const fetchUsers = async()=>{
      const res = await fetchFunction(auth.access_token) 
      if(res.status !== 200){
        const new_token = await refresh()
        const res = await fetchFunction(new_token)
      }
    }
    fetchUsers()
  }, [])

  
  return (
    <div>
        <h2>Users List</h2>
        {
          users?.length ? (
            users.map((user, i)=>(
              <li key={i}>{user?.user}</li>
            ))
          ): 
          <p>No Users to display</p>
        }
    </div>
  )
}

export default Users