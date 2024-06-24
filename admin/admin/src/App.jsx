import { useState } from 'react'

import './App.css'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Order from './pages/Orders/Order'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  

  return (
   <div>
    <ToastContainer/>
      <Navbar/>
      <hr />
      <div className='app-content'>
        <Sidebar/>
    <Routes>
      <Route path='/add' element={<Add/>}></Route>
      <Route path='/list' element={<List/>}></Route>
      <Route path='/order' element={<Order/>}></Route>
    </Routes>
      </div>
   </div>
  )
}

export default App
