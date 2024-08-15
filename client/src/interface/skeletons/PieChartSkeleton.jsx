import React from "react";

const PieChartSkeleton = () => {
  return (
    <div className="w-full h-64 flex items-center justify-center">
      <div className="animate-pulse bg-gray-300 h-64 w-full rounded-lg"></div>
    </div>
  );
};

export default PieChartSkeleton;
