import React from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Login = () => {

    const navigate=useNavigate();
    function GoHome(){
        navigate('/home');
    }


//******************************axios start */
const setHeader=()=>{
    const header={
        headers:{
         "x-auth-token":localStorage.getItem("token")
        }
     }
     return header
  }//***** */SETTING HADERS FOR AXIOS IS IMPORTANT FOR AUTHORIZATION WHILE SENDING RESPONSE
  
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [pswd,setPswd]=useState("");
  
  
    const handleSubmit=async(e)=>{
     e.preventDefault();
     var newUser={ 
       username:name,
       email:email,
       password:pswd,
     }
     await axios.post("https://story-app-api.vercel.app/api/register",newUser)
                .then((res)=>{
                  console.log("login=",res);
                  console.log("user id=",res.data._id);
                  localStorage.setItem("token",res.data.accessToken);  
                  localStorage.setItem("id",res.data._id)
                  localStorage.setItem("username",res.data.username);
                  localStorage.setItem("email",res.data.email);
                  console.log("logged user=",newUser)
                  navigate('/home')
                })
                .catch((e)=>{console.log(e)})
              }
  //******************************axios end */

  return(
    <>
    
    <div className="Navbar">
            <div className="Loginlogo">VoyceMe</div>
    </div>

    <div className="login">
        <div className="loginLeft">
            <img src={'https://cdn.dribbble.com/users/42048/screenshots/8350927/robotintro_dribble.gif'} />
        </div>
        <form className="loginRight"  onSubmit={handleSubmit}>
            <div className="loginTitle">SignUp</div>
            <div className="Name">
                <input type="text" className='loginInput' placeholder='Enter Name' onChange={(e)=>{setName(e.target.value)}}/>
            </div>
            <div className="email">
                <input type="text" className='loginInput'placeholder='Enter Email'  onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div className="pswd">
                <input type="text" className='loginInput'placeholder='Enter Password'  onChange={(e)=>{setPswd(e.target.value)}}/>
            </div>
            <div className="loginButton" onClick={handleSubmit}>LOGIN</div>
            <div className="loginsignin" onClick={GoHome}>Aldready have an account ? Login</div>
        </form>

    </div>
    </>
  )
  }

export default Login