import React, { useState, useEffect } from "react";
import Navbar from "../core/Navbar";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { toast } from "react-toastify";
import { getAllProducts, deleteProduct } from "./helper/adminapicall";

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

  const updateProduct = () => {
    //
  };

  const deleteThisProduct = (productId) => {
    deleteProduct(user._id, token, productId).then((data) => {
      if (data.error) {
        return toast(data.error, { type: "error", theme: "colored" });
      }
      preloadData();
    });
  };
  return (
    <>
      <Navbar />
      <Base>
        <p className="text-3xl text-center">Manage Products</p>
        <p className="text-md pt-1 text-center">Manage your products here</p>
        <div className="h-screen w-screen bg-gray-900 justify-center p-20">
          {products.map((prod, index) => {
            console.log(prod);
            return (
              <div
                key={index}
                className="h-[100px] content-center mt-4  w-[600px] rounded-lg bg-gray-600 justify-between flex mx-auto "
              >
                <div className="h-[80px] w-[240px] text-start pl-3 pt-3">
                  <p className="text-xl text-white">{prod.name}</p>
                  <p className="text-md text-white">{prod.description}</p>
                </div>
                <div className="h-[80px] w-[340px] flex">
                  <button
                    onClick={updateProduct}
                    className="block text-center h-10 w-32 max-w-xs mx-auto mt-8 bg-green-500 hover:bg-green-700 focus:bg-green-700 text-white rounded-lg px-3  font-semibold"
                  >
                    Update
                  </button>
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
      </Base>
    </>
  );
}

export default ManageProducts;
