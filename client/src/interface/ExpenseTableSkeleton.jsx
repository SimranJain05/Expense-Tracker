import React from "react";
import Skeleton from "./Skeleton";

export default function ExpenseTableSkeleton({ className }) {
  return (
    <div className={className}>
      <Skeleton className={"h-10 rounded-md"} />
      <Skeleton className={"h-5 rounded-md"} />
      <Skeleton className={"h-5 rounded-md"} />
    </div>
  );
}
