import React, { useState } from "react";
import EditIcon from "../../interface/Svgs/EditIcon";
import DeleteIcon from "../../interface/Svgs/DeleteIcon";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/slices/loading.slice";
import {
  deleteUserExpensesApi,
  updateUserExpensesApi,
} from "../../api/expense.api";
import { setError } from "../../redux/slices/error.slice";
import { setSuccess } from "../../redux/slices/success.slice";
import DeleteModal from "../../interface/DeleteModal";
import EditExpenseModal from "./EditExpenseModal";

export default function ExpenseTable({ expenses, setExpenses, budget = null }) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const dispatch = useDispatch();

  const deleteExpense = async () => {
    dispatch(setLoading(true));
    const res = await deleteUserExpensesApi(deleteModalOpen._id);
    if (!res.success) {
      dispatch(setError(res.message));
    } else {
      setExpenses((prevExpenses) => {
        return prevExpenses.filter(
          (expense) => expense._id !== deleteModalOpen._id
        );
      });
      if (budget !== null) {
        budget.spending -= deleteModalOpen.amount;
        budget.items -= 1;
      }
      dispatch(setSuccess(res.message));
    }
    setDeleteModalOpen(false);
    dispatch(setLoading(false));
  };

  const editExpense = async (e) => {
    e.preventDefault();
    if (editModalOpen !== null && editModalOpen.change == true) {
      const data = {
        name: editModalOpen.name,
        amount: editModalOpen.amount,
        date: Date.now(),
        budget: editModalOpen.budget,
      };
      dispatch(setLoading(true));
      const res = await updateUserExpensesApi(editModalOpen._id, data);
      if (!res.success) {
        dispatch(setError(res.message));
      } else {
        const updatedExpense = res.updatedExpense;
        if (budget !== null) {
          const previousExpense = expenses.find(
            (expense) => expense._id === updatedExpense._id
          );

          if (previousExpense) {
            budget.spending -= previousExpense.amount;
            budget.spending += updatedExpense.amount;
          }
        }
        setExpenses((prevExpenses) => {
          const filteredExpenses = prevExpenses.filter(
            (expense) => expense._id !== editModalOpen._id
          );
          return [updatedExpense, ...filteredExpenses].sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
        });

        dispatch(setSuccess(res.message));
      }
      setEditModalOpen(false);
      dispatch(setLoading(false));
    }
  };

  const formatDate = (dateStr) => {
    const options = { month: "long", year: "numeric", day: "numeric" };
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <>
      <table className="expense-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((row, i) => (
            <tr key={row._id}>
              <td>{row.name}</td>
              <td>{row.amount}</td>
              <td>{formatDate(row.date)}</td>
              <td className="flex gap-2">
                <button
                  className="editicon"
                  onClick={() => setEditModalOpen(row)}
                >
                  <EditIcon />
                </button>
                <button
                  className="hover:text-red-600"
                  onClick={() => setDeleteModalOpen(row)}
                >
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {deleteModalOpen && (
        <DeleteModal
          confirmClick={deleteExpense}
          cancelClick={() => setDeleteModalOpen(false)}
        />
      )}
      {editModalOpen && (
        <EditExpenseModal
          closePopup={() => setEditModalOpen(false)}
          selectedExpense={editModalOpen}
          handleSubmit={editExpense}
          setSelectedExpense={(e) => {
            setEditModalOpen(e);
          }}
        />
      )}
    </>
  );
}
