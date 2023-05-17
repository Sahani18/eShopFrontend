import React, { useState } from "react";
import { useEffect } from "react";
import Base from "../core/Base";
import Navbar from "../core/Navbar";
import { isAuthenticated } from "../auth/helper";
import {
  updateProduct,
  getaProduct,
  getAllCatagories,
} from "./helper/adminapicall";
import { toast, ToastContainer } from "react-toastify";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate, useParams } from "react-router-dom";

const UpdateaProduct = () => {
  let navigate = useNavigate();
  const { productID } = useParams();
  const [value, setValue] = useState({
    name: "",
    description: "",
    price: "",
    catagory: "",
    stock: "",
    photo: "",
    catagories: [],

    loading: false,
    error: "",
    createdProduct: "",
    didRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    catagory,
    stock,
    photo,
    catagories,

    loading,
    error,
    createdProduct,
    didRedirect,
    formData,
  } = value;

  const { token, user } = isAuthenticated();
  const preloadData = (productID) => {
    getaProduct(productID)
      .then((data) => {
        if (data.error) {
          return setValue({ ...value, error: data.error });
        } else {
          preloadCategories();
          setValue({
            ...value,
            name: data.name,
            description: data.description,
            price: data.price,
            catagory: data.catagory._id,
            stock: data.stock,
            formData: new FormData(),
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const preloadCategories = () => {
    getAllCatagories().then((data) => {
      if (data.error) {
        setValue({ ...value, error: data.error });
      } else {
        setValue({
          catagories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    preloadData(productID);
  }, []);

  const handleChange = (name) => (event) => {
    const values =
      name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, values);
    setValue({ ...value, [name]: values });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValue({ ...value, error: "", loading: true });
    console.log(value);
    updateProduct(user._id, token, formData, productID)
      .then((data) => {
        if (data.error) {
          setValue({ ...value, error: data.error });
          return toast(data.error, { type: "error", theme: "colored" });
        } else {
          setValue({
            ...value,
            name: "",
            description: "",
            price: "",
            catagory: "",
            stock: "",
            photo: "",
            catagories: [],
            loading: false,
            error: "",
            createdProduct: data.name,
          });
          toast(`${data.name} updated successfully`, {
            type: "success",
            theme: "colored",
          });
          setTimeout(() => {
            return navigate("/admin/manage/products");
          }, 1500);
        }
      })
      .catch((err) => toast(err, { type: "error", theme: "colored" }));
  };
  return (
    <>
      {" "}
      <Link to="/admin/AdminDashboard">
        <ArrowLeftCircleIcon className="w-10 h-10 ml-5 hover:cursor-pointer" />
      </Link>
      <div className="min-w-[500px] pb-10 min-h-screen bg-gray-900 flex items-center justify-center px-5 py-2">
        <div className="bg-gray-900 text-gray-400 w-max-[1000px] mx-auto rounded-3xl shadow-xl w-full overflow-hidden">
          <div className="w-full md:w-1/2 py-10 px-5 md:px-10 mx-auto">
            <form>
              <div className="flex -mx-3">
                <div className="w-1/2 px-3 mb-5">
                  <label className="text-lg font-semibold px-1">Name</label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                    </div>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={handleChange("name")}
                      className="w-full -ml-10 pl-2 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="Product Name"
                    />
                  </div>
                </div>
                <div className="w-1/2 px-3 mb-5">
                  <label for="" className="text-lg font-semibold px-1">
                    Price
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                    </div>
                    <input
                      type="number"
                      value={price}
                      required
                      onChange={handleChange("price")}
                      className="w-full -ml-10 pl-2 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="Price"
                    />
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <label for="" className="text-lg font-semibold px-1">
                    Description
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                    </div>
                    <textarea
                      type="text"
                      required
                      value={description}
                      onChange={handleChange("description")}
                      className="w-full -ml-10 pl-2 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="Description of the product"
                    />
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-1/2 px-3 mb-5">
                  <label className="text-lg font-semibold px-1">Quantity</label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                    </div>
                    <input
                      type="number"
                      required
                      value={stock}
                      onChange={handleChange("stock")}
                      className="w-full -ml-10 pl-2 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="Number of quantity"
                    />
                  </div>
                </div>
                <div className="w-1/2 px-3 mb-5">
                  <label for="" className="text-lg font-semibold px-1">
                    Photo
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                    </div>
                    <input
                      type="file"
                      name="photo"
                      accept="image"
                      onChange={handleChange("photo")}
                      className="w-full -ml-10 pl-2 pr-3 py-2 rounded-lg border-2 border-indigo-500 outline-none focus:border-indigo-500"
                      placeholder="Choose a photo"
                    />
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-12">
                  <label for="" className="text-lg font-semibold px-1">
                    Catagory
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                    </div>

                    <select
                      onChange={handleChange("catagory")}
                      className="w-full -ml-10 pl-2 pr-3 py-2 rounded-lg border-2 border-gray-700 outline-none focus:border-indigo-500"
                      placeholder="Catagory"
                    >
                      <option>Select</option>
                      {catagories &&
                        catagories.map((cate, index) => (
                          <option key={index} value={cate._id}>
                            {cate.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <button
                    onClick={onSubmit}
                    className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                  >
                    UPDATE PRODUCT
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

function UpdateProduct() {
  return (
    <>
      <Navbar />
      <Base
        title={"Update your product here"}
        description={"Welcome to product updation section"}
      >
        {UpdateaProduct()}
        <ToastContainer />
      </Base>
    </>
  );
}

export default UpdateProduct;
