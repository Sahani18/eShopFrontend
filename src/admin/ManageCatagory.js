import React, { useState, useEffect } from "react";
import Navbar from "../core/Navbar";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { ToastContainer, toast } from "react-toastify";
import { getAllCatagories, deleteCatagory } from "./helper/adminapicall";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function ManageCatagory() {
  const [catagory, setCatagory] = useState([]);
  const { user, token } = isAuthenticated();

  const preloadData = () => {
    getAllCatagories()
      .then((data) => {
        if (data.error) {
          toast(data.error, { type: "error", theme: "colored" });
        }
        setCatagory(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    preloadData();
  }, []);

 
  const deleteThisCatagory = (catagoryID) => {
    deleteCatagory(user._id, token, catagoryID).then((data) => {
      if (data.error) {
        return toast(data.error, { type: "error", theme: "colored" });
      } else {
        toast("Deleted sucessfully", { type: "success", theme: "colored" });
        preloadData();
      }
    });
  };
  return (
    <>
      <Navbar />
      <Base>
        <p className="text-3xl text-center">Manage Catagory</p>
        <p className="text-md pt-1 text-center">Manage your catagories here</p>
        <Link to="/admin/AdminDashboard">
          <ArrowLeftCircleIcon className="w-10 h-10 ml-5 hover:cursor-pointer" />
        </Link>
        <div className=" w-screen bg-gray-900 justify-center p-20">
          {catagory.map((cate, index) => {
            
            return (
              <div
                key={index}
                className="h-[100px] content-center mt-4  w-[600px] rounded-lg bg-gray-600 justify-between flex mx-auto "
              >
                <div className="h-[80px] w-[240px] text-start pl-3 pt-3">
                  <p className="text-xl text-white">{cate.name}</p>
                  <p className="text-md text-white">{cate.description}</p>
                </div>
                <div className="h-[80px] w-[340px] flex">
                  <Link to={`/admin/catagory/update/${cate._id}`}>
                    <div className="block h-10 w-32 max-w-xs mx-auto mt-8 bg-green-500 hover:bg-green-700 focus:bg-green-700 text-white rounded-lg   font-semibold text-center">
                      <p className="text-center pt-2">Update</p>
                    </div>
                  </Link>
                  <button
                    onClick={() => {
                      deleteThisCatagory(cate._id);
                    }}
                    className="block h-10 text-center w-32 max-w-xs mx-auto mt-8 bg-red-500 hover:bg-red-700 focus:bg-red-700 text-white rounded-lg px-3 font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <ToastContainer />
      </Base>
    </>
  );
}

export default ManageCatagory;
