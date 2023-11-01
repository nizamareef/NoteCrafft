import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

export default function Signup(props) {
    const[details,setDetails]=useState({name:"",email:"",password:"",cpassword:""})
    const navigate=useNavigate()
    const handleOnClick=async(e)=>{
        e.preventDefault();
        const response= await fetch("https://notebook-yqkm.onrender.com/api/auth/create",{
            method:"POST",
            headers:{
                'Content-type':"application/json",
            },
            body:JSON.stringify({name:details.name,email:details.email,password:details.password})
        });     
        const json =await response.json()
        if(json.success){
            localStorage.setItem('token',json.authtoken)
            navigate("/")
            props.showAlert('Account created Succesfully','success',)
        }
        else{
            props.showAlert('Enter valid details','danger' );
        }

    }
    const onChange=(e)=>{
        setDetails({...details,[e.target.name]:e.target.value})
    }
  return (
    <div className='container'>
    <h1>Create Your Account</h1>
    <form onSubmit={handleOnClick}> 
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name="name"  onChange={onChange} aria-describedby="text" />
           
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control " id="email" name="email" onChange={onChange} aria-describedby="emailHelp"  />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" onChange={onChange} name="password" minLength={5} required/>
        </div>
        <div className="mb-3 form-check">
        </div>
        <button type="submit" className="btn btn-primary" > Signup </button>
    </form>
</div>
  )
}
