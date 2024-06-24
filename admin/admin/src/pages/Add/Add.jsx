import React, { useState } from 'react'
import "./Add.css"
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'
function Add() {
    const url='http://localhost:4000' 
    const [image,setImage]=useState(false)
    const [data,setData]=useState({
        name:"",
        description:"",
        price:"",
        category:"salad"
    })

    const Handler=(event)=>{
       const name=event.target.name //event target name will give us the name of the attribute "name" in the input
       const value=event.target.value
       setData((prev)=>({...prev,[name]:value}))  
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);
      
        try {
          const response = await axios.post(`${url}/api/food/add`, formData, {
            // headers: {
            //   'Content-Type': 'multipart/form-data',
            // },
          });
          if (response.data.success) {
            setData({
              name: "",
              description: "",
              price: "",
              category: "salad"
            });
            setImage(false);
            console.log("hello");
            toast.success(response.data.message)
          }
        } 
        catch (error) {
          console.error('Error submitting form:', error.response ? error.response.data : error.message);
        }
      };
      
  return (
    <div className='add'>
        <form action="" className='flex-col' onSubmit={submitHandler}>
            <div className="add-img-upload flex-col">
                <p>Upload image</p>
                <label htmlFor="image">
                    <img  src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input type="file" id='image'  onChange={(e)=>setImage(e.target.files[0])}  hidden required/>
            </div>
            <div className="add-product-name flex-col">
                <p>product name</p>
                <input onChange={Handler} value={data.name} type="text" name="name" placeholder='type here' />
            </div>

            <div className="add-product-description flex-col">
                    <p>product description</p>
                    <textarea onChange={Handler} value={data.description} type="text" name="description" row="6" placeholder='write content' />
            </div>

            <div className="add-category-price">
                <div className="add-category flex-col">
                        <p>product category</p>
                        <select onChange={Handler}  name="category" id="">
                            <option value="salad">salad</option>
                            <option value="rolls">rolls</option>
                            <option value="desert">desert</option>
                            <option value="sandwich">sandwich</option>
                            <option value="cake">cake</option>
                            <option value="pure veg">pure veg</option>
                            <option value="pasta">pasta</option>
                            <option value="noodles">noodles</option>
                        </select>
                </div>
                <div className="add-price flex-col">
                    <p>product price</p>
                    <input onChange={Handler} value={data.price} type="number" name="price" placeholder='$20'/>
                </div>

            </div>
            <button type='submit' className='add-button'>ADD</button>
        </form>
    </div>
  )
}

export default Add