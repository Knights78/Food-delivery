import { createContext, useState } from "react";
// import { food_list } from "../assets/assets";
import { useEffect } from "react";
export const StoreContext=createContext(null)
import axios from "axios"

const StoreContextProvider=(props)=>{
    const [cartItems,setCartItems]=useState({});//cartItems contains key value pair fodd id and its quantity
   const [food_list,setFood_list]=useState([])
   //const [username,setUsername]=useState(null)
    const url='http://localhost:4000/'
    const [token, setToken] = useState(localStorage.getItem("Token") || "");
    const addtoCart=async (itemId)=>{
        if(!cartItems[itemId])
            {
                setCartItems((prev)=>({...prev,[itemId]:1}))
            }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }    
        if(token)
            {
                await axios.post('http://localhost:4000/api/cart/add',{itemId},{headers:{token}})
            }
    }

    const removefromCart=async(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token)
            {
                await axios.post('http://localhost:4000/api/cart/remove',{itemId},{headers:{token}})
            }

    }


    const LoadCartdata=async(token)=>{
       // console.log("inside load cart data")
        const response=await axios.post('http://localhost:4000/api/cart/get',{},{headers:{token}})
        setCartItems(response.data.cartData)
    }

    const TotalAmount=()=>{
        let amount=0
        for(const item in cartItems)
            {
                if(cartItems[item] > 0)
                    {
                        let food=food_list.find((product)=>product._id===item)
                       amount+=food.price*cartItems[item]//because cartItems contain the key value pair 

                    }
                
                
            }
        
    return amount
    }
    const fetchfoodList=async(req,res)=>{
        try {
            const response= await axios.get('http://localhost:4000/api/food/list')
            //console.log(response)
            if(response.data.success)
                {
                    setFood_list(response.data.data)
                }
        } catch (error) {
             console.log("error in fetching the list",error)   
        }
    }

    // const fetchUserDetails=async(req,res)=>{
    //     try {
    //         const response=await axios.get('http://localhost:4000/api/user/details', {headers:{token}})
    //        // console.log(response)
    //         if(response.data.success)
    //             {
    //                 setUsername(response.data.data)
    //             }
    //     } catch (error) {
    //         console.log("error in fetching the details",error)   
    //     }

    // }
   

    useEffect(()=>{
      
            async function LoadData(){
              await  fetchfoodList(); 
               //await  fetchUserDetails();
              if(localStorage.getItem("Token"))
                {
                    setToken(localStorage.getItem("Token"))
                    await LoadCartdata(localStorage.getItem("Token"));
                   
                }
            }
          
            LoadData();
          
    },[])
    const contextValue={
        food_list,
        cartItems,
        setCartItems,
        addtoCart,
        removefromCart,
        TotalAmount,
        url,
        token,
        setToken,
       // username
    


    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider