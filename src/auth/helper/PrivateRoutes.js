import React from "react";
import { Navigate,Outlet } from "react-router-dom";
import { isAuthenticated } from "./index";

const PrivateRoute = () => {
  return isAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate
      replace
      to={{
        pathname: "/signin",
      }}
    />
  );
};
export default PrivateRoute;
