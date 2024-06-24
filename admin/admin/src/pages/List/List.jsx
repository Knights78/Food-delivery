import React, { useEffect } from 'react'
import "./List.css"
import axios from "axios"
import { useState } from 'react'
import { toast } from 'react-toastify'
function List() {
    const url="http://localhost:4000"
    const [list,setList]=useState([])
    const List= async ()=>{
        const response=await axios.get(`${url}/api/food/list`)
      // console.log(response)
        if(response.data.success)
            {
                setList(response.data.data);
               // console.log(list)
               
            }
            else{
                    toast.error("An error occured ")
            }
    }

    const removeitem=async(Id)=>{
        ///console.log("inside")
        const response=await axios.post(`${url}/api/food/remove`,{id:Id})
       await List()
       if(response.data.success)
        {
            toast.success("item deleted succesfully")
        }

    }

    useEffect(()=>{
        List();
    },[removeitem])
  
  return (
    <div className='list add flex-col'>
        <p>list Items</p>
        <div className="list-table">
            <div className="list-table-format title">
                <b>Image</b>
                <b>Category</b>
                <b>Price</b>
                <b>Action</b>
                <b>Actions</b>
            </div>
            {list.map((item,index)=>{
                return(

                <div key={index} className='list-table-format'>
                    <img src={`${url}/images/`+item.image} alt="" />
                    <p>{item.name}</p>
                    <p>{item.category}</p>
                    <p>{item.price}</p>
                    <p className='cursor' onClick={()=>removeitem(item._id)}>X</p>
                </div>
                )

            })}
        </div>

    </div>




  )
}

export default List


