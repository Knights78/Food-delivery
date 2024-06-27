import React, { useContext } from 'react';
import "./Cart.css";
import { StoreContext } from '../../context/StoreContext';
import {useNavigate} from "react-router-dom"
function Cart() {
  const { food_list, removefromCart, cartItems,TotalAmount } = useContext(StoreContext);
   const navigate=useNavigate();
  // Get the array of cart item IDs
  const cartItemIds = Object.keys(cartItems);

  const filteredItems = food_list.filter(item => cartItemIds.includes(item._id) && cartItems[item._id] > 0);
  

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>items</p>
          <p>title</p>
          <p>price</p>
          <p>quantity</p>
          <p>total</p>
          <p>remove</p>
        </div>
        <br />
        <hr />
        {filteredItems.length === 0 ? (
          <p className='display-messg'> Please add items to your cart.</p>
        ) : (
          filteredItems.map((item, index) => (
            <div key={index}>
              <div className="cart-items-title cart-items-item">
                <img src={'http://localhost:4000/images/'+item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>${(cartItems[item._id] * item.price).toFixed(2)}</p>
                <p onClick={() => removefromCart(item._id)} className='cross'>X</p>
              </div>
              <hr />
            </div>
          ))
        )}
      </div>
      <div className="cart-bottom">
        <div className="left-side">
          <h2>cart total</h2>
          <div>
            <div className="cart-items-detail">
              <p>subtotal</p>
              <p>${TotalAmount()==0 ? 0 : TotalAmount()}</p>
            </div>
            <hr />
            <div className="cart-items-detail">
              <p>delivery fee</p>
              <p>${TotalAmount()==0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-items-detail">
              <b>Total</b>
              <b>${TotalAmount()==0 ? 0 : TotalAmount()+2}</b>
            </div>
          </div>
          <button onClick={()=>navigate('/order')}>Proceed to Checkout</button>  
        </div>

        <div className="cart-promocode">
          <div>
            <p>Enter Promo code here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='promo code'/>
              <button>submit</button>
            </div>
          </div>
        </div>
      
      </div>
    </div>
  );
}

export default Cart;
