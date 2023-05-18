import React, { useState } from "react";
import { addItemToCart } from "./helper/cartHelper";
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

  return (
    <div className="w-[250px] rounded-md border">
      <img
        src={productImage}
        alt="Laptop"
        className="h-[180px] w-full rounded-t-md object-cover"
      />
      <div className="p-4 ">
        <div className="flex justify-around">
          <p className="inline-flex items-center text-2xl font-semibold">
            {products.name}
          </p>
          <p>{products.price}</p>
        </div>
        <p className="mt-1 text-sm text-gray-600">{products.description}</p>

        {addToCart ? (
          <button
            onClick={() => {
              addCart();
              return setAddToCart(false);
            }}
            type="button"
            className="mt-4 w-full rounded-sm bg-gray-500 px-2 py-1.5 text-sm font-semibold text-gray-950 shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Add to Cart
          </button>
        ) : (
          <button
            onClick={() => setAddToCart(true)}
            type="button"
            className="mt-4 w-full rounded-sm bg-red-800 px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
          >
            Remove from Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
