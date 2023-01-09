import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";

const RequireAuth = ({allowedRoles}) => {
    //Retrive the auth from the global scope
    const {auth} = useContext(AuthContext)
    
    const location = useLocation();
    return (
        //We Check if the Auth object has any roles
        //If any, we loop through the roles and check in the allowedRoles if we have a match
        //If the user is loged in and not authorized we can redirect the user to an autorized page
        auth?.roles?.find(role => allowedRoles?.includes(role)) 
            ? <Outlet/> 
            : auth?.user
                ? <Navigate to="/unauthorized" state={{from:location}} replace/>
                :<Navigate to="/login" state={{from: location}} replace/>
    )
}

export default RequireAuth