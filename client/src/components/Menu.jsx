import React from "react";
import StatsIcon from "../interface/Svgs/StatsIcon";
import BudgetIcon from "../interface/Svgs/BudgetIcon";
import ExpenseIcon from "../interface/Svgs/ExpenseIcon";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/slices/loading.slice";
import { signout } from "../api/auth.api";
import { setError } from "../redux/slices/error.slice";
import { setSuccess } from "../redux/slices/success.slice";
import LogoutIcon from "../interface/Svgs/LogoutIcon";

export default function Menu({ isOpen, setOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignout = async () => {
    dispatch(setLoading(true));
    const res = await signout();
    if (!res.success) {
      dispatch(setError(res.message));
    } else {
      dispatch(setSuccess(res.message));
      navigate("/sign-in");
    }
    dispatch(setLoading(false));
  };

  return (
    <motion.div
      initial={{ x: isOpen ? "0%" : "-100%" }}
      animate={{ x: isOpen ? "0%" : "-100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed lg:flex h-screen flex-col items-center z-10 bg-white shadow"
    >
      <div className="h-full py-4 px-7 border-r">
        <h1 className="text-gray-600 text-2xl text-nowrap">Expense Tracker</h1>
        <div className="mt-20 text-lg flex flex-col gap-6">
          <Link
            onClick={() => setOpen(false)}
            to="/dashboard"
            className="flex gap-2 px-4 py-2 hover:bg-gray-900 cursor-pointer rounded-md hover:text-white"
          >
            <StatsIcon className="hover:text-white" />
            <span>Stats</span>
          </Link>
          <Link
            to="/dashboard/budget"
            onClick={() => setOpen(false)}
            className="flex gap-2 px-4 py-2 hover:bg-gray-900 cursor-pointer rounded-md hover:text-white"
          >
            <BudgetIcon className="hover:text-white" />
            <span>Budgets</span>
          </Link>
          <Link
            to="/dashboard/expense"
            onClick={() => setOpen(false)}
            className="flex gap-2 px-4 py-2 hover:bg-gray-900 cursor-pointer rounded-md hover:text-white"
          >
            <ExpenseIcon className="hover:text-white" />
            <span>Expenses</span>
          </Link>
        </div>
      </div>
      <div className="p-2 flex gap-2">
        <span>Logout</span>
        <LogoutIcon
          onClick={handleSignout}
          className={"h-6 w-6 cursor-pointer"}
        />
      </div>
    </motion.div>
  );
}
