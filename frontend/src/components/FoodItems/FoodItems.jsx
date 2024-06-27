import React, { useContext, useState } from 'react'
import "./FoodItems.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
function FoodItems({id,name,price,description,image}) {
    
    const {cartItems,setCartItems,addtoCart,removefromCart}=useContext(StoreContext)
    // console.log('http://localhost:4000/images'+image)
  return (
    <div className='food-items'>
        <div className="img-container">

       
            <img src={'http://localhost:4000/images/'+image} alt="" />
          {!cartItems[id] 
          ? <img  className='add-img'src={assets.add_icon_white} onClick={()=>addtoCart(id)} alt="" />
          : <div className='add '>
            <img src={assets.remove_icon_red} onClick={()=>removefromCart(id)} alt="" />
            <p>{cartItems[id]}</p>
            <img src={assets.add_icon_green} onClick={()=>addtoCart(id)} alt="" />
          </div>
        }

        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <h3>{name}</h3>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-description">
                {description}
            </p>
            <p className="food-item-price">
                ${price}
            </p>
        </div>
    </div>
  )
}

export default FoodItems