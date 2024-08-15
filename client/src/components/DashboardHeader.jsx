import React from "react";
import { Sling as Hamburger } from "hamburger-react";

export default function DashboardHeader({ isOpen, setOpen }) {
  return (
    <div className="w-full h-fit bg-gray-900 p-4 text-white text-left text-xl flex gap-2 items-center justify-between">
      <span>Dashboard</span>
      <Hamburger toggled={isOpen} toggle={setOpen} />
    </div>
  );
}
