import React from "react";
import Skeleton from "../Skeleton";

export default function OverviewCardSkeleton() {
  return (
    <div className="w-full md:w-2/5 lg:w-[30%] py-10 flex justify-between mx-4">
      <div className="flex flex-col gap-2">
        <Skeleton className={"rounded-md w-14 h-4"} />
        <Skeleton className={"rounded-md w-20 h-5"} />
      </div>
      <Skeleton className={"rounded-full w-10 h-10"} />
    </div>
  );
}
