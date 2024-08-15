import React from "react";
import Skeleton from "./Skeleton";

export default function BudgetCardSkeleton({ className }) {
  return (
    <div className={className}>
      <div className="flex justify-between gap-2">
        <div className="flex gap-2">
          <Skeleton className={"rounded-full h-10 w-10"} />
          <div className="flex flex-col gap-2">
            <Skeleton className={"rounded-md h-4 w-32"} />
            <Skeleton className={"rounded-md h-2 w-20"} />
          </div>
        </div>
        <Skeleton className={"rounded-md h-8"} />
      </div>
      <div className="w-full mt-5 flex flex-col gap-2">
        <div className="flex justify-between gap-2">
          <Skeleton className={"rounded-md h-3 w-10"} />
          <Skeleton className={"rounded-md h-3 w-10"} />
        </div>
        <Skeleton className={"rounded-md h-2"} />
      </div>
      <div className="flex justify-end mt-2">
        <Skeleton className={"rounded-md h-8 w-24"} />
      </div>
    </div>
  );
}
