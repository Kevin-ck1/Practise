import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";

const RequireAuth = () => {
    //Retrive the auth from the global scope
    const {auth} = useContext(AuthContext)

    const location = useLocation();
    return (
        //First we check if the auth object has user
        //If true, using ternary operator, we will house the components inside the outlet
        //If false, the user is to be navigated to the login page
        //Note that we have set state so that once the user is logged in is redirect back.
        auth?.user ? <Outlet/> : <Navigate to="/login" state={{from: location}} replace/>
    )
}

export default RequireAuth