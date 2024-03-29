import React, { useState, useEffect } from "react";
import Navbar from "../core/Navbar";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { ToastContainer, toast } from "react-toastify";
import { getAllProducts, deleteProduct } from "./helper/adminapicall";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
const API = process.env.REACT_APP_BACKEND;

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const { user, token } = isAuthenticated();

  const preloadData = () => {
    getAllProducts()
      .then((data) => {
        if (data.error) {
          toast(data.error, { type: "error", theme: "colored" });
        }
        setProducts(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    preloadData();
  }, []);

  const deleteThisProduct = (productId) => {
    deleteProduct(user._id, token, productId).then((data) => {
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
        <p className="text-3xl text-center">Manage Products</p>
        <p className="text-md pt-1 text-center">Manage your products here</p>
        <Link to="/admin/AdminDashboard">
          <ArrowLeftCircleIcon className="w-10 h-10 ml-5 hover:cursor-pointer" />
        </Link>
        <div className=" w-screen bg-gray-900 justify-center p-20">
          {products.map((prod, index) => {
            return (
              <div
                key={index}
                className="h-[130px] content-center mt-4 w-2/3 rounded-lg bg-gray-600 justify-between flex mx-auto "
              >
                <div className="h-full w-24">
                  <img
                    src={`${API}/product/photo/${prod._id}`}
                    className="h-full rounded-l-lg"
                    alt={prod.name}
                  />
                </div>
                <div className="h-[80px] w-[240px] text-start pl-3 pt-3">
                  <p className="text-2xl text-gray-300">{prod.name}</p>
                  <p className="text-md text-gray-400">{prod.description}</p>
                </div>
                <div className="h-[80px] w-[340px] flex">
                  <Link to={`/admin/product/update/${prod._id}`}>
                    <div className="block h-10 w-32 max-w-xs mx-auto mt-8 bg-green-500 hover:bg-green-700 focus:bg-green-700 text-white rounded-lg   font-semibold text-center">
                      <p className="text-center pt-2">Update</p>
                    </div>
                  </Link>
                  <button
                    onClick={() => {
                      deleteThisProduct(prod._id);
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

export default ManageProducts;
