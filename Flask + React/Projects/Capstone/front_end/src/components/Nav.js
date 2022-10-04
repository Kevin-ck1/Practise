import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
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
                  <li className="nav-item">
                    <Link className="nav-link" to="#">Products</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="#">Suppliers</Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="#">Clients</Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="#">Jobs</Link>
                  </li>
                </ul>
                <div className="navbar-text">
                  {/* {%if user.is_authenticated  %}
                    <div className="d-flex justify-content-between">
                      <p className="mx-1">{{user.username}}</p>
                      <Link to="{% url 'company:logout' %}">Logout</Link>
                    </div>
                  {%else%}
                    <Link to="{% url 'company:login' %}?next={% firstof request.path '/' %}">Login</Link>
                  {%endif%} */}
                  <Link to="/login">Login</Link>
                </div>
              </div>
            </div>
        </nav>
    </div>
  )
}

export default Nav