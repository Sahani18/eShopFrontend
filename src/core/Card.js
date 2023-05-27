import React, { useState } from "react";
import { addItemToCart, removeCartItem } from "./helper/cartHelper";
const API = process.env.REACT_APP_BACKEND;

const Card = ({ products }) => {
  const [addToCart, setAddToCart] = useState(true);
  //const [count, setCount] = useState(products.count);
  const productImage = products
    ? `${API}/product/photo/${products._id}`
    : `https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60`;

  const addCart = () => {
    addItemToCart(products);
  };

  const removeCart = (id) => {
    removeCartItem(id);
  };

  return (
    <div className="w-[250px] h-[350px] rounded-md bg-slate-800 shadow-md shadow-gray-700">
      <img
        src={productImage}
        alt="Laptop"
        className="h-[180px] w-full rounded-t-md object-cover"
      />
      <div className="p-4 ">
        <div className="flex justify-between">
          <p className="inline-flex items-center text-start text-xl font-semibold">
            {products.name}
          </p>
          <div className="bg-indigo-700 h-9 w-16 text-center text-white rounded-2xl">
            <p className="text-center mt-1">₹ {products.price}</p>
          </div>
        </div>
        <p className="mt-1 text-sm text-gray-400">{products.description}</p>

        {addToCart ? (
          <button
            onClick={() => {
              addCart();
              return setAddToCart(false);
            }}
            type="button"
            className="mt-6 w-full rounded-sm bg-indigo-500 px-2 py-1.5 text-sm font-semibold text-gray-950 shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Add to Cart
          </button>
        ) : (
          <button
            onClick={() => {
              removeCart(products._id);
              return setAddToCart(true);
            }}
            type="button"
            className="mt-6 w-full rounded-sm bg-red-800 px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
          >
            Remove from Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
