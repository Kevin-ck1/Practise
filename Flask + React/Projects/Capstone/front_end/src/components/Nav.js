import { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthProvider'
import Logout from './hooks/Logout'


const Nav = () => {
  const {auth} = useContext(AuthContext)
  const logout = Logout()
  var links = ["products", "suppliers", "clients","jobs", "admin" ]
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light " style={{backgroundColor: "#e3f2fd"}}>
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">Company</Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                  </li>
                  {
                    links.map((link, i)=>{
                      return(
                        <li className="nav-item" key={i}>
                          <Link className="nav-link" to={link}>{link.charAt(0).toUpperCase() + link.slice(1)}</Link>
                        </li>
                      )
                    })
                  }
                </ul>
                <div className="navbar-text">
                  {auth?.user ? 
                    (
                      <div className="d-flex justify-content-between">
                        <p className="mx-2">{auth.user}</p>
                        <Link onClick={logout}>Logout</Link>
                      </div>
                    ):
                    (<Link to="/login">Login</Link>) 
                  }
                </div>
              </div>
            </div>
        </nav>
    </div>
  )
}

export default Nav