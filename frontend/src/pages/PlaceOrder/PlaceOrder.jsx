import React, { useContext, useState } from 'react';
import "./PlaceOrder.css";
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";

function PlaceOrder() {
  const { TotalAmount, token, food_list, cartItems } = useContext(StoreContext);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const placeorder = async (e) => {
    e.preventDefault();
    let order_items = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let iteminfo = { ...item, quantity: cartItems[item._id] };
        order_items.push(iteminfo);
      }
    });

    let orderData = {
      address: data,
      items: order_items,
      amount: TotalAmount() + 2,
    };

    
  };

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form className="place-order" onSubmit={placeorder}>
      <div className="left">
        <p className="title">DELIVERY INFORMATION</p>
        <div className="multi-fields">
          <input name="firstname" onChange={onChangeHandler} value={data.firstname} type="text" placeholder='first name' />
          <input name="lastname" onChange={onChangeHandler} value={data.lastname} type="text" placeholder='last name' />
        </div>
        <input name="email" onChange={onChangeHandler} value={data.email} type="text" placeholder='email' />
        <input name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder='street' />
        <div className="multi-fields">
          <input name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder='city' />
          <input name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder='state' />
        </div>
        <div className="multi-fields">
          <input name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='zip code' />
          <input name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder='country' />
        </div>
        <input name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder='phone' />
      </div>
      <div className="right">
        <div className="left-side">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-items-detail">
              <p>Subtotal</p>
              <p>${TotalAmount() === 0 ? 0 : TotalAmount()}</p>
            </div>
            <hr />
            <div className="cart-items-detail">
              <p>Delivery Fee</p>
              <p>${TotalAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-items-detail">
              <b>Total</b>
              <b>${TotalAmount() === 0 ? 0 : TotalAmount() + 2}</b>
            </div>
          </div>
          <button type='submit'>Proceed to payment</button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
