import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="text-5xl font-bold">Error 404</h1>
      <p className="mt-2 text-xl font-medium">
        Sorry, You may have  Misspelled the URL
      </p>
      <p className="mt-4 text-gray-600">
        Or May Be This Page Went On Vacation.
      </p>
      <div className="mt-12 flex w-full flex-col items-center space-y-2 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
        <Link
          to="/home"
          className="flex items-center space-x-2 rounded-md bg-gray-200 py-2 px-4 text-gray-800 hover:bg-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span>Home</span>
        </Link>
        <Link
          to="/#footer"
          className="flex items-center space-x-2 rounded-md bg-gray-200 py-2 px-4 text-gray-800 hover:bg-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          <span>Contact Us</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
