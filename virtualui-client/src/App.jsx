import React, { useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { useDispatch } from "react-redux";
import { setUserData } from "./redux/userSlice";
import axios from "axios";

export const ServerURL = "http://localhost:8000";


function App() {
const dispatch = useDispatch();

 useEffect(() => {
       const fetchUser = async () => {
         try {
           const res = await axios.get(ServerURL + "/api/user/current-user", { withCredentials: true });
            dispatch(setUserData(res.data.user));
         } catch (err) {
           console.log(err);
            dispatch(setUserData(null));
         }
       }
       fetchUser();               
 },[])

  return (
    <Routes>

      <Route path='/' element={<Home />} />
    </Routes>
  )
}

export default App