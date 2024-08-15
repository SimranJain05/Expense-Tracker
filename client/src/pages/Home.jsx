import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="text-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-gray-300 via-slate-500 to-zinc-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Track Every Dollar.
            <span className="sm:block"> Empower Every Decision. </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            Take Control of Your Finances & Effortlessly Manage Your Expenses
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              className="block w-full rounded border border-zinc-600 bg-zinc-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-zinc-600 focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              to="/dashboard"
            >
              Get Started
            </Link>

          </div>
        </div>
      </div>
      <div className="w-full">
        <img src="stats.png" className="w-[80%] mx-auto border-2 rounded-xl overflow-hidden mb-2" alt="" />
      </div>
    </section>
  );
}
