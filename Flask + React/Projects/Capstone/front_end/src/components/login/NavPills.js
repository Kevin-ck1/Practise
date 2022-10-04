import { Link, useLocation } from "react-router-dom"


const NavPills = () => {
    const location = useLocation()
    return (
    <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
        <li className="nav-item">
            <Link className ={`nav-link  ${location.pathname==="/login" && "active"}`}  id="tab-login" to="/login" >Login</Link>
        </li>
        <li className="nav-item">
            <Link className ={`nav-link  ${location.pathname==="/register" && "active"}`} id="tab-register" to="/register" >Register</Link>
        </li>
    </ul>
    )
}

export default NavPills