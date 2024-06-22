import React, { useContext } from 'react'
import "./PlaceOrder.css"
import { StoreContext } from '../../context/StoreContext'
function PlaceOrder() {
  const {TotalAmount}=useContext(StoreContext)
  return (
   <form action="" className="place-order">
    <div className="left">
      <p className="title">DELIVERY INFORMATION</p>
      <div className="multi-fields">
        <input type="text" placeholder='first name'/>
        <input type="text" placeholder='last name' />
      </div>
      <input type="text" placeholder='email'/>
      <input type="text" placeholder='street'/>
      <div className="multi-fields">
        <input type="text" placeholder='city'/>
        <input type="text" placeholder='state' />
      </div>

      <div className="multi-fields">
        <input type="text" placeholder='zip code'/>
        <input type="text" placeholder='country' />
      </div>
      <input type="text"placeholder='phone' />
    </div>

    <div className="right">
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
            <button >Proceed to payment</button>  
        </div>
    </div>
   </form>
  )
}

export default PlaceOrder