import { useNavigate } from "react-router-dom";
import React, { useState } from 'react'
const Login = (props) => {
    let host = "http://localhost:5000"
    const [credential, setcredential] = useState({ email: "", password: "" })
    let navigate = useNavigate();
    const{showAlert} = props

    let handlerequest = async (e) => {
        e.preventDefault() // To Stop the page for reloading
        //API Call
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })
        });

        let json = await response.json()
        if(json.success === true)
        {
            //save the auht-token and redirect to the home page
            localStorage.setItem('token',json.authtoken)
            showAlert("You have successfully login","success")
            navigate('/');

        }else{
            showAlert("Wrong Email and Password","danger")
        }
    }

    let onchange = (e) => {
        setcredential({ ...credential, [e.target.name]: e.target.value });
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handlerequest}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={credential.email} name='email' required onChange={onchange} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="password" value={credential.password} name='password' required onChange={onchange} />
                </div>
                <button type="submit" className="btn btn-success mt-3">Login</button>
            </form>
        </div>
    )
}

export default Login