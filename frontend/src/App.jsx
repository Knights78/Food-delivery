import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import MobileApp from './components/MobileApp/MobileApp'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'
import Myorders from './pages/Myorders/Myorders'

function App() {
  
 const [login,setLogin]=useState(false)
  return (
    <>
    {login?<LoginPopup setLogin={setLogin}/>:""}
    <div className='app'>
      <Navbar setLogin={setLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/myorder' element={<Myorders/>}/>
      </Routes>
    </div>
    <MobileApp/>
    <Footer/>
    </>
  )
}

export default App
