import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper";

export const Navbar = () => {
  const navigate = useNavigate();
  const highligted =
    "text-sm text-yellow-500 hover:text-gray-600 dark:text-yellow-500";
  const notHighlighted =
    "text-sm text-gray-400 hover:text-yellow-400 dark:text-gray-400";

  return (
    <div className="bg-gray-900  w-screen ">
      <nav className=" px-8 py-2 flex justify-between items-center border-y border-gray-400 dark:border-gray-700">
        <NavLink
          to="/"
          className="text-3xl font-bold leading-none active:text-yellow-500 flex items-center space-x-4"
        >
          <span>
            <img
              alt="icons8-jumper-94"
              src={"/icons8-jumper-94.png"}
              style={{ height: 50 }}
            />
          </span>
          <span className="text-gray-400 dark:text-gray-300 text-2xl font-normal">
            E kart
          </span>
        </NavLink>
        <div className="lg:hidden">
          <button className="navbar-burger flex items-center text-gray-600 dark:text-gray-300 p-3">
            <svg
              className="block h-4 w-4 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
        <ul className="hidden lg:flex lg:items-center grow mx-10 space-x-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => {
                return isActive ? highligted : notHighlighted;
              }}
            >
              Home
            </NavLink>
          </li>
          <li className="text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              className="w-4 h-4 current-fill"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </li>
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) => {
                return isActive ? highligted : notHighlighted;
              }}
            >
              Cart
            </NavLink>
          </li>
          <li className="text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              className="w-4 h-4 current-fill"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </li>
          <li>
            <NavLink
              to="/wishlist"
              className={({ isActive }) => {
                return isActive ? highligted : notHighlighted;
              }}
            >
              Wishlist
            </NavLink>
          </li>
          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <>
              <li className="text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  className="w-4 h-4 current-fill"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </li>
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) => {
                    return isActive ? highligted : notHighlighted;
                  }}
                >
                  Dashboard
                </NavLink>
              </li>
            </>
          )}
          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <>
              <li className="text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  className="w-4 h-4 current-fill"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </li>
              <li>
                <NavLink
                  to="/admin/adminDashboard"
                  className={({ isActive }) => {
                    return isActive ? highligted : notHighlighted;
                  }}
                >
                  Admin Dashboard
                </NavLink>
              </li>
            </>
          )}
          {!isAuthenticated() && (
            <>
              <li className="text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  className="w-4 h-4 current-fill"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </li>
              <li>
                <NavLink
                  to="/signup"
                  className={({ isActive }) => {
                    return isActive ? highligted : notHighlighted;
                  }}
                >
                  Sign Up
                </NavLink>
              </li>
              <li className="text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  className="w-4 h-4 current-fill"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </li>
              <li>
                <NavLink
                  to="/signin"
                  className={({ isActive }) => {
                    return isActive ? highligted : notHighlighted;
                  }}
                >
                  Sign In
                </NavLink>
              </li>
            </>
          )}
          {isAuthenticated() && (
            <>
              <li className="text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  className="w-4 h-4 current-fill"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </li>

              <li>
                <NavLink
                  onClick={() => {
                    signout().then(() => navigate("/"));
                  }}
                  className={notHighlighted}
                >
                  Sign Out
                </NavLink>
              </li>
            </>
          )}
        </ul>
        {isAuthenticated() && (
          <div className="space-x-2 hidden lg:block">
            <span className="relative inline-block">
              <img
                className="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
                alt="John Doe"
              />
              <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-600 ring-2 ring-white"></span>
            </span>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
