import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepg from './pages/Homepg'
import Customerpg from './pages/Customerpg'
import Menupg from './pages/Menupg'

const MyRoutes = () => {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Homepg/>}/>
                <Route path='/customer/:id' element={<Customerpg/>}/>
                <Route path='/menu' element={<Menupg/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default MyRoutes