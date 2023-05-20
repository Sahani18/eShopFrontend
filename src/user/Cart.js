import { Heart, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import Navbar from "../core/Navbar";
import Base from "../core/Base";
import { loadCart } from "../core/helper/cartHelper";
import { toast } from "react-toastify";
const API = process.env.REACT_APP_BACKEND;

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    return setCount(count + 1);
  };

  const decreaseCount = () => {
    return count > 0 ? setCount(count - 1) : setCount(0);
  };

  useEffect(() => {
    setProducts(loadCart());
  }, []);
  return (
    <div className="flex">
      <div className="w-2/3  p-10 ">
        {/*  cart item layout */}
        {products.map((item, index) => {
          return (
            <div
              key={index}
              className="w-[500px] bg-gray-700 h-40 mt-4 rounded-lg shadow-lg flex p-2"
            >
              <div className="h-32 w-52 my-auto ml-1 rounded-md bg-white content-center ">
                <img
                  src={`${API}/product/photo/${item._id}`}
                  className="h-full w-full rounded-md"
                />
              </div>
              <div className="h-36 w-[300px] content-center ml-5 justify-start">
                <p className="text-3xl text-gray-300">{item.name}</p>
                <p className="text-md text-gray-400">{item.description}</p>
                <div className=" mt-3 flex">
                  <div className="min-w-24 flex">
                    <button onClick={decreaseCount} type="button" className=" ">
                      <p className="text-2xl -mt-6 pr-1">_</p>
                    </button>
                    <input
                      type="text"
                      className="mx-1 h-7 w-9 rounded-md border text-center"
                      value={count}
                    />
                    <button onClick={increaseCount} type="button" className=" ">
                      <p className="text-2xl -mt-1">+</p>
                    </button>
                  </div>
                </div>
                <div className=" flex text-sm pt-1">
                  <button
                    type="button"
                    className="flex items-center space-x-1 px-2 py-1 pl-0"
                  >
                    <Trash size={16} className="text-red-500" />
                    <span className="text-sm font-semibold text-red-500">
                      Remove Item
                    </span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-1/3 bg-gray-700 rounded-lg mt-6 mr-10 h-fit p-2 ">
        <section aria-labelledby="summary-heading" className="">
          <h2
            id="summary-heading"
            className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-200 sm:p-4"
          >
            Price Details
          </h2>
          <div>
            <dl className=" space-y-1 px-2 py-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-300">Price ({products.length} item)</dt>
                <dd className="text-sm font-medium text-gray-300">₹ 52,398</dd>
              </div>
              <div className="flex items-center justify-between pt-4">
                <dt className="flex items-center text-sm text-gray-300">
                  <span>Discount</span>
                </dt>
                <dd className="text-sm font-medium text-green-400">
                  - ₹ 3,431
                </dd>
              </div>
              <div className="flex items-center justify-between py-4">
                <dt className="flex text-sm text-gray-300">
                  <span>Delivery Charges</span>
                </dt>
                <dd className="text-sm font-medium text-green-400">Free</dd>
              </div>
              <div className="flex items-center justify-between border-y border-dashed py-4 ">
                <dt className="text-base font-medium text-gray-100">
                  Total Amount
                </dt>
                <dd className="text-base font-medium text-gray-100">
                  ₹ 48,967
                </dd>
              </div>
            </dl>
            <div className="px-2 pb-4 font-medium text-green-400">
              You will save ₹ 3,431 on this order
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const ProductCart = () => {
  return (
    <>
      <Navbar />
      <Base title={"Shopping Cart"} description={"Manage your cart here"}>
        <Cart />
      </Base>
    </>
  );
};
export default ProductCart;
