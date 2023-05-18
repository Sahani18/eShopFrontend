import React, { useEffect, useState } from "react";
import Base from "./core/Base";
import Card from "./core/Card";
import Navbar from "./core/Navbar";
import "./index.css";
import { getAllProducts } from "./core/helper/coreapicalls";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  const [product, setProduct] = useState([]);
  const getProduct = () => {
    getAllProducts()
      .then((data) => {
        if (data.error) {
          return toast(data.error, { theme: "colored", type: "error" });
        }
        console.log(data);
        setProduct(data);
      })
      .catch((err) => toast(err, { theme: "colored", type: "error" }));
  };

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      <Navbar />
      <Base title="Let's do Shopping" description="Welcome to the Store">
        <div className=" p-10  grid grid-cols-4   gap-10">
          {product.map((data, index) => {
            return <Card key={index} products={data}/>;
          })}
        </div>
        <ToastContainer />
      </Base>
    </>
  );
};

export default App;
