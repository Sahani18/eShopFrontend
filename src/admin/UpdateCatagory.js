import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import Navbar from "../core/Navbar";
import { Link, useParams, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";

import { updateCatagory, getaCatagory } from "./helper/adminapicall";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";

const CatagoryCard = () => {
  let navigate = useNavigate();

  const { catagoryID } = useParams();

  const [name, setName] = useState("");

  const { user, token } = isAuthenticated();

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const preloadData = (catagoryID) => {
    getaCatagory(catagoryID)
      .then((data) => {
        if (data.error) {
          return toast("Error occurred");
        } else {
          setName(data.name);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    preloadData(catagoryID);
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();

    //name is in {} coz in body of api call catagory is json.stringify
    updateCatagory(user._id, token, { name }, catagoryID)
      .then((data) => {
        if (data.error) {
          return toast(data.error);
        } else {
          setName("");
          toast("Catagory updated successfully", {
            type: "success",
            theme: "colored",
          });
          setTimeout(() => {
            return navigate("/admin/manage/catagory");
          }, 1500);
        }
      })
      .catch((err) => {
      return  toast("Failed to update catagory", {
          type: "error",
          theme: "colored",
        });
      });
  };
  return (
    <div className="h-screen w-screen bg-gray-900 pt-10 justify-center">
      <div className="h-[350px] w-[600px]  bg-slate-950 rounded-lg mx-auto shadow-lg shadow-gray-700">
        <div>
          <br />
          <Link to="/admin/AdminDashboard">
            <ArrowLeftCircleIcon className="w-10 h-10 ml-5 hover:cursor-pointer" />
          </Link>

          <p className="text-2xl text-center text-gray-400">
            Update your catagory
          </p>
          <br />
          <div className="flex  ">
            <form className="w-96 mb-5 mx-auto">
              <input
                type="text"
                value={name}
                autoFocus
                required
                onChange={handleChange}
                className="w-full  pl-2 pr-3 py-2 justify-center rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                placeholder="Catagory Name"
              />
              <br />

              <button
                onClick={onSubmit}
                className="block w-60 max-w-xs mx-auto mt-10 bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
              >
                Update
              </button>
            </form>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
};
const UpdateCatagory = () => {
  return (
    <>
      <Navbar />
      <Base>{CatagoryCard()}</Base>
      <ToastContainer />
    </>
  );
};

export default UpdateCatagory;
