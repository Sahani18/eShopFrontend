import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminDashboard from "./user/AdminDashboard";
import ProductCart from "./user/Cart";

const Routing = () => {
  return (
    <BrowserRouter>
  
      <Routes>
        <Route path="/" exact element={<App />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/signin" exact element={<Signin />} />
        <Route path="/AdminDashboard" exact element={<AdminDashboard />} />
        <Route path="/Cart" exact element={<ProductCart />} />
      </Routes>
    
    </BrowserRouter>
  );
};

export default Routing;
