import React from 'react'
import {Link,useLocation} from 'react-router-dom'
import logo from "../images/logo.JPG";

function Navbar() {
    let location=useLocation();
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">
                    <img src={logo} width="50" height="30" className="d-inline-block align-top" alt=""/>
                        EDS
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className={`nav-link ${location.pathname==="/"? "active": ""}`} to="/">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/emp"? "active": ""}`} to="/emp">E-Database</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar