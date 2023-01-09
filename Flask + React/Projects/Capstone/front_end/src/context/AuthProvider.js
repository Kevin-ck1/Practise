import { createContext, useEffect, useState } from "react";

//Init createContext
const AuthContext = createContext({})

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({}) 
    useEffect(() => {
      const auth_data = JSON.parse(localStorage.getItem('auth')) || ""
      setAuth(auth_data)
    },[])
    
    
    return (
      //Rapping up the children(tree with the creatContext instance, in this case AuthContext)
      //Also passing the values to the context i.e in the value part
      <AuthContext.Provider value={{auth, setAuth}}>
          {children}
      </AuthContext.Provider>
    )
}

export default AuthContext; // Contains the variables to be used in the global scope
