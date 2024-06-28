import React, { useEffect } from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import axios from "axios"
import './Order.css'
import assert from 'assert';
function Order() {
  const url='http://localhost:4000'
const [orders,setOrders]=useState([])
  const fetchList=async(req,res)=>{
    const response=await axios.get(`${url}/api/order/list`);
   // console.log(response)
    if(response.data.success)
      {
        setOrders(response.data.data)
      }
      else{
        toast.error("ERRRRROOOORRR")
      }
  }
  const statusHandler=async(event,orderId)=>{
   // console.log(event,orderId)
    const response=await axios.post(`${url}/api/order/status`,{
      orderId,
      status:event.target.value
    });
    //console.log(response)
    if(response.data.success)
      {
        await fetchList()
      }
  }
  useEffect(()=>{
     fetchList()
  },[])
  return (
    <div className='order add'>
      <h3>order page</h3>

      <div className="order-list">
        {orders.map((order,index)=>(
              <div key={index} className='order-item'>
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="order-item-food">
                  {order.items.map((item,index)=>{
                    if(index==order.items.length-1)
                      {
                        return item.name+"  X  "+item.quantity
                      }
                      else{
                        return item.name+"  X  "+item.quantity+" ,  "
                      }
                  })}
                </p>
                <p className='order-item-name'>
                  {order.address.firstname+"  "+order.address.lastname}
                </p>
                <div className='order-item-address'>
                  {order.address.street+" , "}
                  {order.address.city+" , "+order.address.state+" , "+order.address.country+" , "}
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
              </div>
              <select onChange={(e)=>statusHandler(e,order._id)} value={order.status} name="" id="">
                <option value="food processing">food processing</option>
                <option value="out for delivery">out for delivery</option>
                <option value="delivered">delivered</option>
              </select>
           </div>
        ))}
      </div>
    </div>
  )
}

export default Order