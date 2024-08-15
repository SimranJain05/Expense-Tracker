import React from "react";

export default function Skeleton({ className, children }) {
  return (
    <div className={`animate-pulse bg-gray-200 ${className}`}>{children}</div>
  );
}
