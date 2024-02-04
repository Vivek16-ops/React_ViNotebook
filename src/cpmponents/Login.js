import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
const Login = () => {
    let host = "http://localhost:5000"
    const [credential, setcredential] = useState({ email: "", password: "" })

    let history = useHistory();
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
        if(json.success == true)
        {
            //save the auht-token and redirect to the home page
            history.push("/");
        }else{
            alert("Invalid Credential")
        }
    }

    let onchange = (e) => {
        setcredential({ ...credential, [e.target.name]: e.target.value });
    }

    return (
        <div>
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