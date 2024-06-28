import React, { useContext, useEffect, useState } from 'react'
import './Myorders.css'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"
import { assets } from '../../assets/assets'
function Myorders() {
    const [data,setData]=useState([])
    const{token}=useContext(StoreContext);

    const fetchOrders=async(req,res)=>{
        const response=await axios.post('http://localhost:4000/api/order/userorder',{},{headers:{token}} )
      //  console.log(response)
        if(response.data.success)
            {
                //console.log("inside if")
                setData(response.data.data)
                //console.log(data)
            }
           
    }
    useEffect(()=>{
        if(token){
            fetchOrders();
        }
    
    },[token])
  return (
    <div className='my-orders'>
        <div className="container">
            {data.map((order,index)=>{
                return(
                
                    <div className='my-orders-order' key={index}>
                    <img src={assets.parcel_icon} alt="" />
                    <p>{order.items.map((item,index)=>{
                        if(index==order.items.length-1)//for last element
                        {
                            return(
                                item.name+ "  X  "   +item.quantity
                            )
                        }
                        else{
                            return(
                                item.name+ "  X  "   +item.quantity+" , "
                            )
                        }
                    })}</p>
                    <p>${order.amount}.0</p>
                    <p>items:{order.items.length}</p>
                    <p> <b>{order.status}</b>   </p>
                    <button>Track order</button>
                    
                </div>





                )
            })}
        </div>


       


    </div>

  
  )
}



export default Myorders