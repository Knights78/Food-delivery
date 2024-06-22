import { useContext, useState } from 'react'
import {assets} from '../../assets/assets'

import { Link } from 'react-router-dom'
import "./Navbar.css"
import { StoreContext } from '../../context/StoreContext'
const Navbar=({setLogin})=>{
    const [menu,setMenu]=useState("home")
    const {cartItems}=useContext(StoreContext)
    let Length = Object.keys(cartItems).length
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
                <button onClick={()=>setLogin(true)}>signin</button>
            </div> 

        </div>
    )
}
export default Navbar