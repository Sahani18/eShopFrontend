import React from "react";
import "../index.css";
import Navbar from "./Navbar";

export const Base = ({
  title = "My title",
  description = "My description",
  className="text-gray-500",
  children,
}) => {
  return (
    <div className="bg-gray-900">
      <Navbar/>
      <div className="text-gray-500 justify-center mx-auto text-center">
        <p className="text-4xl p-1">{title}</p>
        <p className="text-md">{description}</p>
      </div>
      <div className={className}>{children}</div>

      <footer className="bg-gray-900 bottom-0 left-0 right-0 mt-auto fixed p-1">
        <div className="text-left pl-4">
          <p className="text-gray-500 ">
            Shop your Tees with © <span className="text-red-800">E kart</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Base;
