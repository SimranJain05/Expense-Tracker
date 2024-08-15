import React from "react";
import Skeleton from "./Skeleton";

export default function AddExpenseModalSkeleton({ className }) {
  return (
    <div className={className}>
      <Skeleton className={"w-24 h-5 rounded-md"} />
      <Skeleton className={"w-28 h-4 rounded-md"} />
      <Skeleton className={"w-full h-7 rounded-md"} />
      <Skeleton className={"w-28 h-4 rounded-md"} />
      <Skeleton className={"w-full h-7 rounded-md"} />
      <Skeleton className={"w-full h-10 rounded-md"} />
    </div>
  );
}
