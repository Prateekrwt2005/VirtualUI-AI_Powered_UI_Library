import React, { useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Generate from './pages/Generate';
import { useDispatch, useSelector } from "react-redux";
import { setAllComponents, setAllUsers, setUserData } from "./redux/userSlice";
import axios from "axios";
import { useState } from "react";
import MyComponents from "./pages/MyComponents";
import AllComponents from "./pages/AllComponents";
import AdminDashboard from "./pages/AdminDashboard";
import Pricing from "./pages/Pricing";

export const ServerURL = "http://localhost:8000";


function App() {
const dispatch = useDispatch();
const {userData} = useSelector((state) => state.user)

const [authChecked, setAuthChecked] = useState(false);

 useEffect(() => {
       const fetchUser = async () => {
         try {
           const res = await axios.get(ServerURL + "/api/user/current-user", { withCredentials: true });
            dispatch(setUserData(res.data.user));

            setAuthChecked(true);
         } catch (err) {
           console.log(err);
            dispatch(setUserData(null));
            setAuthChecked(true);
         }
       }
       fetchUser();               
 },[])

 useEffect(() => {
  if(!userData) return;
    const fetchAllUsers = async () => {
    try {
      const usersRes = await axios.get(
        ServerURL + "/api/user/all-users",
        { withCredentials: true }
      );

      dispatch(setAllUsers(usersRes.data.users));
      console.log(usersRes.data);
    } catch (error) {
      console.log(error);
      dispatch(setAllUsers(null));
    }
  };
  const fetchAllComponents = async () => {
  try {
    const componentsRes = await axios.get(
      ServerURL + "/api/component/all-components",
      { withCredentials: true }
    );

    dispatch(setAllComponents(componentsRes.data.components));
    console.log(componentsRes.data);
  } catch (error) {
    console.log(error);
    dispatch(setAllComponents(null));
  }
};

fetchAllUsers();
fetchAllComponents();

 
  },[userData, dispatch])

  return (
    <>
    {
      !authChecked && 
  <div className="fixed top-0 left-0 w-full h-1 bg-[#35ebff] animate-pulse z-50" />

    }
    <Routes>

      <Route path='/' element={<Home />} />
      <Route path='/generate' element={<Generate />} />
      <Route path='/my-components' element={<MyComponents />} />
      <Route path='/components' element={<AllComponents />} />
      <Route path='/admin' element={<AdminDashboard />} />
      <Route path='/pricing' element={<Pricing />} />
    </Routes>
    </>
  )
}

export default App