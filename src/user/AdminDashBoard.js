import React from "react";
import Base from "../core/Base";
import Navbar from "../core/Navbar";
import LeftSidebar from "../core/AdminSidebar";
import { isAuthenticated } from "../auth/helper";

const RightSideBar = () => {
  const {
    user: { name, lastname, email },
  } = isAuthenticated();
  return (
    <div className="h-[400px] w-[600px] bg-slate-900 rounded-lg mx-auto mt-10 shadow-lg shadow-gray-700">
      <div>
        <p className="text-2xl text-center text-gray-400 pt-5">
          Welcome to Admin Dashboard
        </p>
        <p className="text-md text-center text-gray-500 pt-2">
          Manage your products here
        </p>
        <br />
        
        <div className="lg:block justify-center pt-5 ">
          
            <img
              className="h-24 w-24 rounded-full mx-auto"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
              alt={name}
            />
         
        </div>
        <br />
     
         <p className="text-lg pl-2 mt-[2px] text-center"><span className="text-red-800 text-2xl"> Hello , </span>{name} {lastname}</p>
          <p className="text-md pl-2 mt-[2px] text-center text-gray-500">{email}</p>
        
      </div>
    </div>
  );
};
const AdminDashboard = () => {
  return (
    <>
      <Navbar />
      <Base>
        <div className="flex">
          <div className="col-span-3"> {LeftSidebar()}</div>
          <div className="col-span-9 bg-gray-800 w-full">{RightSideBar()}</div>
        </div>
      </Base>
    </>
  );
};

export default AdminDashboard;
