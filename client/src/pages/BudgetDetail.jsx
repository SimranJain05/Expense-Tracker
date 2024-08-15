import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import BudgetCard from "../components/Budget/BudgetCard";
import { deleteBudgetApi, getBudgetByIdApi } from "../api/budget.api";
import { useDispatch } from "react-redux";
import { setError } from "../redux/slices/error.slice";
import AddExpenseModal from "../components/Budget/AddExpenseModal";
import EditBudgetModal from "../components/Budget/EditBudgetModal";
import DeleteModal from "../interface/DeleteModal";
import { setLoading } from "../redux/slices/loading.slice";
import { setSuccess } from "../redux/slices/success.slice";
import { addExpenseApi, getExpensesByBudgetApi } from "../api/expense.api";
import ExpenseTableSkeleton from "../interface/ExpenseTableSkeleton";
import ExpenseTable from "../components/Expense/ExpenseTable";
import BudgetCardSkeleton from "../interface/BudgetCardSkeleton";
import Skeleton from "../interface/Skeleton";
import AddExpenseModalSkeleton from "../interface/AddExpenseModalSkeleton";

const BudgetDetail = () => {
  const { budgetId } = useParams();
  const navigate = useNavigate();

  const [budget, setBudget] = useState(false);
  const [expenses, setExpenses] = useState(false);
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState();
  const dispatch = useDispatch();

  const getBudgetById = async () => {
    const res = await getBudgetByIdApi(budgetId);
    if (!res.success) {
      dispatch(setError(res.message));
    } else {
      setBudget(res.budget);
    }
  };

  const getExpensesByBudget = async () => {
    const res = await getExpensesByBudgetApi(budgetId);
    if (!res.success) {
      dispatch(setError(res.message));
    } else {
      setExpenses(res.expenses);
    }
  };

  useEffect(() => {
    getBudgetById();
    getExpensesByBudget();
  }, []);

  const deleteBudget = async () => {
    dispatch(setLoading(true));
    const res = await deleteBudgetApi(budgetId);
    if (!res.success) {
      dispatch(setError(res.message));
    } else {
      navigate("/dashboard/budget");
      dispatch(setSuccess(res.message));
    }
    dispatch(setLoading(false));
    setDeleteModalOpen(false);
  };

  const addExpense = async (body) => {
    dispatch(setLoading(true));
    body.budget = budgetId;
    const res = await addExpenseApi(body);
    if (!res.success) {
      dispatch(setError(res.message));
    } else {
      budget.spending += body.amount;
      setExpenses([res.savedExpense, ...expenses]);
      dispatch(setSuccess(res.message));
    }
    dispatch(setLoading(false));
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold">Budget Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-6">
        <div className="flex flex-col">
          {budget === false ? (
            <>
              <BudgetCardSkeleton
                className={"w-full md:w-full lg:w-full h-fit"}
              />

              <div className="flex justify-end gap-2 mt-2">
                <Skeleton className={"rounded-md h-10 w-24"} />
                <Skeleton className={"rounded-md h-10 w-24"} />
              </div>
            </>
          ) : (
            <>
              <BudgetCard
                budget={budget}
                link={false}
                className={"w-full md:w-full lg:w-full h-fit"}
              />
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setIsEditingBudget(true)}
                  className="bg-gray-900 text-white px-4 py-2 rounded-lg mr-4 hover:bg-gray-800"
                >
                  <FontAwesomeIcon icon={faEdit} className="mr-2" /> Edit
                </button>
                <button
                  onClick={() => setDeleteModalOpen(true)}
                  className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                >
                  <FontAwesomeIcon icon={faTrashAlt} className="mr-2" /> Delete
                </button>
              </div>
            </>
          )}
        </div>

        {budget === false ? (
          <AddExpenseModalSkeleton className={"w-full flex flex-col gap-2"} />
        ) : (
          <AddExpenseModal
            remaining={budget.amount - budget.spending}
            handleSubmit={addExpense}
          />
        )}
      </div>

      {budget !== false && isEditingBudget ? (
        <EditBudgetModal
          budget={budget}
          onClose={() => setIsEditingBudget(false)}
        />
      ) : (
        <></>
      )}
      {deleteModalOpen && (
        <DeleteModal
          confirmClick={deleteBudget}
          cancelClick={() => setDeleteModalOpen(false)}
        />
      )}

      <div className="w-full flex items-center justify-center mt-5">
        {expenses === false ? (
          <ExpenseTableSkeleton className={"flex flex-col gap-2 w-[90%]"} />
        ) : expenses.length > 0 ? (
          <ExpenseTable
            expenses={expenses}
            setExpenses={setExpenses}
            budget={budget}
          />
        ) : (
          <div className="text-2xl">😔 No Expense Found</div>
        )}
      </div>
    </div>
  );
};

export default BudgetDetail;
