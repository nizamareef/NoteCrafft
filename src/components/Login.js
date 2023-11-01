import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'; 



export default function Login(props) {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate()
    const handleClick = async (e) => {
        e.preventDefault()
        const response = await fetch("https://notebook-yqkm.onrender.com/api/auth/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        })
        const json = await response.json()
        console.log(json)
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            props.showAlert('Successfully Signed in!','success')     
            navigate("/")
        }
        else{
           props.showAlert("Enter the correct credentials!", "danger")
        }

    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='container'>
            <h1 >Login To Your Account</h1>
            <form onSubmit={handleClick}  >
                <div className="mb-2">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} value={credentials.email} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} value={credentials.password} id="password" name="password" />
                </div>
                <div className="mb-3 form-check">
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}
