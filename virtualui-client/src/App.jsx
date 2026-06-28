import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Generate from "./pages/Generate";
import MyComponents from "./pages/MyComponents";
import AllComponents from "./pages/AllComponents";
import AdminDashboard from "./pages/AdminDashboard";
import Pricing from "./pages/Pricing";
import AdminRoute from "./components/AdminRoute";

import { useDispatch, useSelector } from "react-redux";
import {
  setAllComponents,
  setAllUsers,
  setUserData,
} from "./redux/userSlice";

import axios from "axios";
import { auth } from "./utils/firebase";
import { getRedirectResult } from "firebase/auth";

export const ServerURL = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";

function App() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkRedirectAndFetch = async () => {
      const tokenOnStart = localStorage.getItem("token");
      try {
        console.log("Checking for Firebase Google Auth redirect result...");
        const redirectRes = await getRedirectResult(auth);
        console.log("Firebase getRedirectResult returned:", redirectRes);
        
        if (redirectRes) {
          const user = redirectRes.user;
          const name = user.displayName;
          const email = user.email;

          console.log("Redirect success. Posting login to backend for user:", email);
          const loginRes = await axios.post(
            ServerURL + "/api/auth/google",
            { name, email },
            { withCredentials: true }
          );
          
          console.log("Backend login response:", loginRes.data);
          if (loginRes.data.token) {
            localStorage.setItem("token", loginRes.data.token);
            console.log("Saved Bearer token to localStorage.");
          }
          dispatch(setUserData(loginRes.data.user));
          setAuthChecked(true);
          return;
        }

        console.log("No redirect result found. Fetching current user session...");
        try {
          const res = await axios.get(
            ServerURL + "/api/user/current-user",
            {
              withCredentials: true,
            }
          );
          console.log("Current user response:", res.data);
          dispatch(setUserData(res.data.user));
        } catch (currentUserErr) {
          if (currentUserErr.response?.status === 401) {
            console.log("User is not currently logged in (anonymous session).");
          } else {
            console.error("Error fetching current user session:", currentUserErr);
          }
          if (tokenOnStart) {
            localStorage.removeItem("token");
            dispatch(setUserData(null));
          }
        }
      } catch (err) {
        console.error("Auth redirect or session check failed:", err);
        if (tokenOnStart) {
          localStorage.removeItem("token");
          dispatch(setUserData(null));
        }
      } finally {
        setAuthChecked(true);
      }
    };

    checkRedirectAndFetch();
  }, [dispatch]);

  useEffect(() => {
    if (!userData) return;

    const fetchAllComponents = async () => {
      try {
        const componentsRes = await axios.get(
          ServerURL + "/api/component/all-components",
          {
            withCredentials: true,
          }
        );

        dispatch(setAllComponents(componentsRes.data.components));
      } catch (error) {
        console.log(error);
        dispatch(setAllComponents(null));
      }
    };

    const fetchAllUsers = async () => {
      try {
        const usersRes = await axios.get(
          ServerURL + "/api/user/all-users",
          {
            withCredentials: true,
          }
        );

        dispatch(setAllUsers(usersRes.data.users));
      } catch (error) {
        console.log(error);
        dispatch(setAllUsers(null));
      }
    };

    // Everyone can fetch components
    fetchAllComponents();

    // Only admins fetch all users
    if (userData.role === "admin") {
      fetchAllUsers();
    }
  }, [userData, dispatch]);

  return (
    <>
      {!authChecked && (
        <div className="fixed top-0 left-0 w-full h-1 bg-[#35ebff] animate-pulse z-50" />
      )}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/generate" element={<Generate />} />

        <Route
          path="/my-components"
          element={<MyComponents />}
        />

        <Route
          path="/components"
          element={<AllComponents />}
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route path="/pricing" element={<Pricing />} />
      </Routes>
    </>
  );
}

export default App;