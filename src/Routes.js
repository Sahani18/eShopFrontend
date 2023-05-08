import React from "react";
import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import App from "./App";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminDashboard from "./user/AdminDashboard";
import ProductCart from "./user/Cart";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<App />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/signin" exact element={<Signin />} />

        {/* admin route */}

        <Route exact element={<AdminRoute />}>
          <Route
            path="/admin/AdminDashboard"
            exact
            element={<AdminDashboard />}
          />
        </Route>
        {/*      private route */}
        <Route exact element={<PrivateRoute />}>
          <Route path="/Cart" exact element={<ProductCart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
