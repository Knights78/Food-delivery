import React, { useEffect } from 'react'
import './Verify.css'
import { useSearchParams,useNavigate } from 'react-router-dom'
import axios from 'axios';
function Verify() {
  //to search from url we use searchparams
  const [searchParams,setSearchParams]=useSearchParams();
  const success=searchParams.get('success')
  const orderId=searchParams.get('orderId')
   const url='http://localhost:4000'
 // console.log(success,orderId)
 const navigate=useNavigate()
 const verifyPayment=async(req,res)=>{
  const response=await axios.post(`${url}/api/order/verify`,{success,orderId})
  if(response.data.success)
    {
      navigate('/myorder')
    }
    else{
      navigate('/')
    }
 }

 useEffect(()=>{
  verifyPayment();
 },[])

  return (
    <div className='verify'>
      <div className="spinner">

      </div>
    </div>
  )
}

export default Verify