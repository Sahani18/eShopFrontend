import React from "react";
import { Link } from "react-router-dom";
import {
  BriefcaseIcon,
  ChartBarIcon,
  UsersIcon,
  PlusCircleIcon,
  TruckIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  return (
    <aside className="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-gray-900 border-r dark:bg-gray-900">
      <Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#4F46E5"
          className="w-8 h-8"
        >
          <path
            fillRule="evenodd"
            d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
            clipRule="evenodd"
          />
          <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
        </svg>
      </Link>
      <div className="flex flex-col mt-6">
        <nav className="flex-1 -mx-3 space-y-3 ">
          <Link
            to={"/admin/create/catagory"}
            className="flex items-center px-3 py-2 text-gray-400 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
          >
            <PlusCircleIcon className="w-5 h-5" />
            <span className="mx-2 text-sm font-medium">Create Catagories</span>
          </Link>
          <Link
            to={"/admin/manage/catagory"}
            className="flex items-center px-3 py-2 text-gray-400 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
          >
            <BriefcaseIcon className="w-5 h-5" />
            <span className="mx-2 text-sm font-medium">Manage Catagories</span>
          </Link>
          <Link
            to={"/admin/create/product"}
            className="flex items-center px-3 py-2 text-gray-400 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
          >
            <ChartBarIcon className="w-5 h-5" />
            <span className="mx-2 text-sm font-medium">Create Product</span>
          </Link>
          <Link
            to={"/admin/manage/products"}
            className="flex items-center px-3 py-2 text-gray-400 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
          >
            <ShoppingBagIcon className="w-5 h-5" />
            <span className="mx-2 text-sm font-medium">Manage Products</span>
          </Link>
          <Link className="flex items-center px-3 py-2 text-gray-400 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
            <TruckIcon className="w-5 h-5" />
            <span className="mx-2 text-sm font-medium">Manage Order</span>
          </Link>
          <Link className="flex items-center px-3 py-2 text-gray-400 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
            <UsersIcon className="w-5 h-5" />
            <span className="mx-2 text-sm font-medium">Registered Users</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
