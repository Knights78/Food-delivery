import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import "./LoginPopup.css"
function LoginPopup({setLogin}) {
    const [currState,setcurrState]=useState("signUp")
  return (
    <div className="login-popup">
        <form action="" className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-input">
                {currState=="Login" ? <></>:<input type="text" name="" placeholder=' your name' />}
                <input type="email" name=""  placeholder=' your email' required/>
                <input type="password" placeholder=' password' required />
            </div>
            <button type="submit">{currState=='signUp' ?"createAccount":"login" }</button>
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