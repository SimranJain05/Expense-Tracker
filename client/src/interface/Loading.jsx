import React from "react";
import { useSelector } from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";

export default function Loading() {
  const { loading } = useSelector((state) => state.loading);

  return (
    loading && (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
        <BeatLoader color="#36d7b7" />
      </div>
    )
  );
}
