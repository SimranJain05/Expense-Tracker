import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Stats from "./Stats";
import Budget from "./Budget";
import Expense from "./Expense";
import Menu from "../components/Menu";
import DashboardHeader from "../components/DashboardHeader";
import BudgetDetail from "./BudgetDetail";

export default function Dashboard() {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="flex">
      <Menu isOpen={isOpen} setOpen={setOpen} />
      <div className="w-full">
        <DashboardHeader isOpen={isOpen} setOpen={setOpen} />
        <Routes>
          <Route path="/" element={<Stats />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/budget/detail/:budgetId" element={<BudgetDetail />} />
          <Route path="/expense" element={<Expense />} />
        </Routes>
      </div>
    </div>
  );
}
