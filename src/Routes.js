import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminDashboard from "./user/AdminDashboard";
import ProductCart from "./user/Cart";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import AddCategory from "./admin/AddCategory";
import UserDashBoard from "./user/UserDashBoard";
import ManageCatagory from "./admin/ManageCatagory";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCatagory from "./admin/UpdateCatagory";
import Wishlist from "./user/Wishlist";


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
            path="/admin/adminDashboard"
            exact
            element={<AdminDashboard />}
          />
          <Route
            path="/admin/create/catagory"
            exact
            element={<AddCategory />}
          />
          <Route
            path="/admin/manage/catagory"
            exact
            element={<ManageCatagory />}
          />
          <Route path="/admin/create/product" exact element={<AddProduct />} />
          <Route
            path="/admin/manage/products"
            exact
            element={<ManageProducts />}
          />
          <Route
            path="/admin/product/update/:productID"
            exact
            element={<UpdateProduct />}
          />
          <Route
            path="/admin/catagory/update/:catagoryID"
            exact
            element={<UpdateCatagory />}
          />
        </Route>
        {/*      private route */}
        <Route exact element={<PrivateRoute />}>
          <Route path="/cart" exact element={<ProductCart />} />
          <Route path="/dashboard" exact element={<UserDashBoard />} />
          <Route path="/wishlist" exact element={<Wishlist />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
