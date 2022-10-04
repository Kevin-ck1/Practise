import { createContext, useState } from "react";

//Init
const UsersContext = createContext({})

export const UsersProvider = ({children}) => {
    const [users, setUsers] = useState({})

    return (
        <UsersContext.Provider value={{users, setUsers}}>
            {children}
        </UsersContext.Provider>
    )
}

export default UsersContext;