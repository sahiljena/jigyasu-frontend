import React,{useState, useEffect} from 'react';
import './App.css';
import Login from './pages/Login'
import Home from './pages/Home'
import useToken from './components/useToken'
import Register from './pages/Register'
import NewProduct from './pages/NewListing'
import MyListings from './pages/Mylistings'
import Category from './pages/Category'
import Searchbar from './components/Searchbar'
import Productpage from './pages/Productpage'
import {Routes,Route} from "react-router-dom"
import AboutUs from './pages/AboutUs';
import EventDashBoardPage from './pages/EventDashBoard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const {token, setToken} = useToken();

  return(
    <div className=''>
    <ToastContainer />
    <Routes>
      <Route path='/' exact element={<Home setToken={setToken} token={token} />} />
      <Route path='/login' exact element={<Login setToken={setToken} token={token} />} />
      <Route path='/register' exact element={<Register setToken={setToken} token={token} />} />
      <Route path='/additem' exact element={<NewProduct setToken={setToken} token={token}  />} />
      <Route path='/search' exact element={<Searchbar token={token} setToken={setToken}   />} />
      <Route path='/event/:id' exact element={<Productpage token={token} setToken={setToken} />} />
      <Route path='/event/:id/dashboard' exact element={<EventDashBoardPage token={token} setToken={setToken} />} />
      <Route path='/dashboard' exact element={<MyListings setToken={setToken} token={token}  />} />
      <Route path='/aboutus' exact element={<AboutUs />} />
      <Route path='/workshops' exact element={<Category setToken={setToken} token={token} endpoint={"https://dr711-backend-2022-01.herokuapp.com/api/event/category/workshop"} category={"Workshops"}  />} /> 
      <Route path='/seminars' exact element={<Category setToken={setToken} token={token} endpoint={"https://dr711-backend-2022-01.herokuapp.com/api/event/category/seminar"} category={"Seminars"}  />} /> 
      <Route path='/symposium' exact element={<Category setToken={setToken} token={token} endpoint={"https://dr711-backend-2022-01.herokuapp.com/api/event/category/symposium"} category={"Symposiums"}  />} /> 
    </Routes>
    </div>
  );
}

export default App;
