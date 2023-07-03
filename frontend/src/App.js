import React from 'react'
import './app.css'
import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import Topbar from './components/topbar/Topbar'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashbaord from './pages/Dashboard'
import Current from './pages/Current'
import Archived from './pages/Archived'
import Complete from './pages/Complete'
// import axios from 'axios';
// import { useEffect } from 'react';
import { useSelector} from 'react-redux'
import UpdateStatus from './pages/UpdateStatus';



function App() {

  const myState = useSelector((state)=> state.setTheUser)
  const user = myState.user
  console.log(user);

  return (
    <Router>
      <Topbar/>
      <Routes>
        <Route path='/' element={user?<Dashbaord/>:<Login/>} />
        <Route path='/register' element={user?<Dashbaord/>:<Register/>} />
        <Route path='/login' element={user?<Dashbaord/>:<Login/>} />
        <Route path='/current' element={user?<Current/>:<Login/>} />
        <Route path='/archived' element={user?<Archived/>:<Login/>} />
        <Route path='/complete' element={user?<Complete/>:<Login/>} />
        <Route path='/changestatus/:id' element={user?<UpdateStatus/>:<Login/>} />
        <Route path='*' element={user?<Dashbaord/>:<Login/>} />
      </Routes>
    </Router>
  )
}

export default App