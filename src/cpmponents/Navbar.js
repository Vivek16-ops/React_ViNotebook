import React from 'react'
import { Link, useLocation } from 'react-router-dom'
const Navbar = () => {
    let location = useLocation()
    // React.useEffect(() => {
    //     console.log(location.pathname)
    // }, [location]);

    const logouthandle = () => {
        localStorage.removeItem('token')
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className={`navbar-brand ${location.pathname === "/" ? "active" : ""}`} to="/">ViNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/home" ? "active" : ""}`} aria-current="page" to="/home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token') ? <><Link className="btn btn-success mx-1" to="/login" role="button">Login</Link>
                        <Link className="btn btn-warning mx-1" to="/signUp" role="button">SignUp</Link></> : <Link className="btn btn-danger mx-1" to="/login" role="button" onClick={logouthandle}>logout</Link>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
