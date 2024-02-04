import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = (props) => {
  const [singupcredential, setsignupcredential] = useState({ name: "", email: "", password: "", cpassword: "" })
  let host = "http://localhost:5000"
  let navigate = useNavigate()
  const { showAlert } = props

  let handlerequest = async (e) => {
    e.preventDefault() // To Stop the page for reloading
    //API Call
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_name: singupcredential.name, email: singupcredential.email, password: singupcredential.password })
    });

    let json = await response.json()
    if (json.success === true) {
      //save the auht-token and redirect to the home page
      localStorage.setItem('token',json.authtoken)
      showAlert("You have Successfully Signed Up","success")
      navigate('/');
    } else {
      showAlert("Please Enter VAlid Credential",'warning')
    }
  }

  let onchange = (e) => {
    setsignupcredential({ ...singupcredential, [e.target.name]: e.target.value });
  }
  return (
    <div>
      <h1>SignUp</h1>
      <form onSubmit={handlerequest}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Name</label>
          <input type="name" className="form-control" id="name" aria-describedby="emailHelp" name='name' value={singupcredential.name} onChange={onchange} />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={singupcredential.email} name='email' onChange={onchange} />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="password" name='password' value={singupcredential.password} onChange={onchange} />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Confirm Password</label>
          <input type="cpassword" className="form-control" id="cpassword" name='cpassword' value={singupcredential.cpassword} onChange={onchange} />
        </div>
        <button type="submit" className="btn btn-warning my-3">Submit</button>
      </form>
    </div>
  )
}

export default SignUp
