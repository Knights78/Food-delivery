import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import "./LoginPopup.css"
import axios from "axios"
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
function LoginPopup({setLogin}) {
    const [currState,setcurrState]=useState("signUp")
    const {url,token,setToken}=useContext(StoreContext)
    const [data,setData]=useState({
        name:"",
        email:"",
        password:""
    })
    const handler=(e)=>{
       const name=e.target.name
       const value=e.target.value
       setData((data)=>({...data,[name]:value}))
       
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

    
        let newurl = ""
        if(currState ==='Login')
            {
              newurl= 'http://localhost:4000/api/user/login'
            }
            else{
            newurl= 'http://localhost:4000/api/user/register'
            }

        console.log(newurl); // Log the URL for debugging
    
        try {
            const response = await axios.post(newurl,data);
           // console.log(response)
    
            if (response.data.success) {
                setToken(response.data.token);
                setLogin(false);
                localStorage.setItem("Token", response.data.token);
                //console.log("inside if")

            } else {
                console.log("else part")
                alert(response.data.message); // Display error message if login/register fails
            }
        } catch (error) {
            console.error('Axios Error:', error); // Log Axios error for debugging
            alert('An error occurred while submitting the form.'); // Inform user about the error
        }
    };    
    

  return (
    <div className="login-popup">
        <form action="" onSubmit={handleSubmit} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-input">
                {currState=="Login" ? <></>:<input onChange={handler} value={data.name}  type="text" name="name" placeholder=' your name' />}
                <input type="email" onChange={handler} name="email" value={data.email}  placeholder=' your email' required/>
                <input type="password" onChange={handler} name="password" value={data.password} placeholder=' password' required />
            </div>
            <button type="submit">{currState=='signUp' ?"createAccount":"Login" }</button>
            <div className="login-popup-condition">
            <p>By agreeing you accept the privacy & policy </p>
                <input type="checkbox" />
               
            </div>
            {currState=='Login' 
            ?   <p>create a new account? <span onClick={()=>setcurrState("signUp")}>Click here</span></p>
            :<p>already have an account? <span onClick={()=>setcurrState("Login")}>Login</span></p>
        }
        

        </form>
    </div>
  )
}

export default LoginPopup