import React, { useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';

export const ServerURL = "http://localhost:8000";


function App() {
 useEffect(() => {
       const fetchUser = async () => {
         try {
           const res = await axios.get(ServerURL + "/api/user/current-user", { withCredentials: true });
           console.log(res.data);
         } catch (err) {
           console.log(err);
         }
       };                
 },[])

  return (
    <Routes>

      <Route path='/' element={<Home />} />
    </Routes>
  )
}

export default App