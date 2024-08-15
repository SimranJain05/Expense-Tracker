import { useState } from "react";
import { useDispatch } from "react-redux";
import { getUserAllExpenses } from "../api/expense.api";
import { setError } from "../redux/slices/error.slice";

export default function useExpense() {
  const [expenses, setExpenses] = useState(false);
  const dispatch = useDispatch();

  async function fetchData() {
    const res = await getUserAllExpenses();
    if (!res.success) {
      dispatch(setError(res.message));
    } else {
      setExpenses(res.expenses);
    }
  }
  return { expenses, setExpenses, fetchData };
}
