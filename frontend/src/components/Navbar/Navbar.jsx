import { useContext, useState } from 'react'
import {useNavigate} from "react-router-dom"
import {assets} from '../../assets/assets'

import { Link } from 'react-router-dom'
import "./Navbar.css"
import { StoreContext } from '../../context/StoreContext'
const Navbar=({setLogin})=>{
 

    const [menu,setMenu]=useState("home")

    const {cartItems,token,setToken,username}=useContext(StoreContext)
     
    // let name=username
    let Length = Object.keys(cartItems).length
    const navigate=useNavigate();

    const Logout=()=>{
        console.log("Logout")
        localStorage.removeItem("token")//this will remove the token from the local storage and no user will be there
        setToken("")
        navigate('/')
    }

    return(
        <div className="navbar">
            <Link to='/'><img src={assets.logo} alt="" className='logo'/></Link>
            <ul className='navbar-menu'>
                <li onClick={()=>setMenu("home")}className={menu=='home'?"active":""}>home</li>
                <li onClick={()=>setMenu("menu")} className={menu=='menu'?"active":""}>menu</li>
                <li onClick={()=>setMenu('mobileapp')} className={menu=='mobileapp'?"active":""}>mobileapp</li>
                <li onClick={()=>setMenu('contactus')} className={menu=='contactus'?"active":""}>contactus</li>
            </ul>
            <div className='navbar-right'>
                <img src={assets.search_icon} alt="" />
                <div className='navbar-search-icon'>
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                    <div className="dot">{Length}</div>
                </div>
                {!token?(
                     <button onClick={()=>setLogin(true)}>signin</button>
                ):(
                    <div className="navbar-profile">
                        <img src={assets.profile_icon} alt="" />
                        <b className='username'>{username}</b>                        
                        <ul className="profile-dropdown">
                            <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                            <hr />
                            <li onClick={Logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                        </ul>
                    </div>
                )}
               
            </div> 

        </div>
    )
}
export default Navbar