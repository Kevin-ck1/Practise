import { useEffect, useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "./hooks/useRefreshToken";


import React from 'react'
import { useContext } from "react";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const {auth} = useContext(AuthContext)

    useEffect(() => {
      const verifyRefreshToken = async()=>{
        try{
            await refresh()
        }
        catch(err){
            console.error(err)
        }
        finally{
            setIsLoading(false)
        }
      }

      !auth
    }, [])
    
    
    return (
    <div>PersistLogin</div>
    )
}

export default PersistLogin