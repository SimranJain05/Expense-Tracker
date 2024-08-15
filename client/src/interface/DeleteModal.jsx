import React from "react";
import CrossIcon from "./Svgs/CrossIcon";

export default function DeleteModal({ confirmClick, cancelClick }) {
  return (
    <div
      onClick={cancelClick}
      className="fixed z-10 inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full px-4 "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md"
      >
        <div className="flex justify-end p-2">
          <button
            onClick={cancelClick}
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <CrossIcon />
          </button>
        </div>

        <div className="p-6 pt-0 text-center">
          <svg
            className="w-20 h-20 text-red-600 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">
            Are you sure you want to delete this expense?
          </h3>
          <button
            onClick={confirmClick}
            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2"
          >
            Yes, I'm sure
          </button>
          <button
            onClick={cancelClick}
            className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"
          >
            No, cancel
          </button>
        </div>
      </div>
    </div>
  );
}
