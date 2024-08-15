import { useState } from "react";
import { useDispatch } from "react-redux";
import { getUserAllBudgetsApi } from "../api/budget.api";
import { setError } from "../redux/slices/error.slice";

export default function useBudget() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [budgets, setBudgets] = useState(false);
  const disptach = useDispatch();

  const getAllBudgets = async () => {
    const res = await getUserAllBudgetsApi();
    if (!res.success) {
      disptach(setError(res.message));
    } else {
      setBudgets(res.budgets);
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return {
    budgets,
    setIsDialogOpen,
    isDialogOpen,
    setBudgets,
    closeDialog,
    getAllBudgets,
  };
}
