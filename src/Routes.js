import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminDashboard from "./user/AdminDashboard";


const Routing = () => {
  return (
    <BrowserRouter>
  
      <Routes>
        <Route path="/" exact element={<App />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/signin" exact element={<Signin />} />
        <Route path="/AdminDashboard" exact element={<AdminDashboard />} />
      </Routes>
    
    </BrowserRouter>
  );
};

export default Routing;
