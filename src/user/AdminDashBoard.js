import React from "react";
import Base from "../core/Base";
import Navbar from "../core/Navbar";
import LeftSidebar from "../core/AdminSidebar";

const AdminDashboard = () => {
  return (
    <>
      <Navbar />
      <Base>{LeftSidebar()}</Base>
    </>
  );
};

export default AdminDashboard;
