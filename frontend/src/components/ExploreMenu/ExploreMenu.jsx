import React from 'react'
import { menu_list } from '../../assets/assets'
import "./ExploreMenu.css"
function ExploreMenu({category,setCategory}) {
  return (
    <div className='explore-menu'>
        <h1>Explore our Menu</h1>
        <p>Discover the best food & drinks in Mumbai stay home and order to your doorstep and satisfy your every craving</p>
        <div className='explore-menu-list'>
            {menu_list.map((item,index)=>(
                <div  onClick={()=>setCategory(prev=> prev===item.menu_name ?"All" : item.menu_name)} key={index} className="menu-item">
                     <img  className={category==item.menu_name ?"active":""} src={item.menu_image} alt="menuImg" />
                     <h4>{item.menu_name}</h4>
                </div>                
            ))}
        </div>
        <hr />
      
    </div>
  )
}

export default ExploreMenu