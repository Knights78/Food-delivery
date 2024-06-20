import React from 'react'
import { assets } from '../../assets/assets'
import "./MobileApp.css"

function MobileApp() {
  return (
    <div className='mobile-app'>

      <h2>FOR BETTER EXPERIENCE DOWLOAND <br />TOMATO APP</h2>
      <div className="logo">
        <img src={assets.play_store} alt="" />
        <img src={assets.app_store} alt="" />
      </div>
    
    
    </div>
  )
}

export default MobileApp