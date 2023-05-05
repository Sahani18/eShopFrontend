import React from "react";
import "../index.css";

export const Base = ({
  title,
  description,
  className = "text-gray-400",
  children,
}) => {
  return (
    <div className="bg-gray-900 ">
      <div className="text-gray-400 justify-center mx-auto text-center">
        <p className="text-4xl">{title}</p>
        <p className="text-md">{description}</p>
      </div>
      <div className={className}>{children}</div>

      <footer className="bg-gray-900 bottom-0 left-0 right-0 mt-auto fixed p-1">
        <div className="text-left pl-4">
          <p className="text-gray-400 ">
            Shop your Tees with © <span className="text-red-800">E kart</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Base;
