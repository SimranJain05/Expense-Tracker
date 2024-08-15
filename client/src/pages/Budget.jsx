import React, { useEffect } from "react";
import BudgetDialog from "../components/Budget/BudgetDialog";
import BudgetCard from "../components/Budget/BudgetCard";
import useBudget from "../hooks/useBudget";
import BudgetCardSkeleton from "../interface/BudgetCardSkeleton";

const Budget = () => {
  const {
    budgets,
    setIsDialogOpen,
    isDialogOpen,
    setBudgets,
    closeDialog,
    getAllBudgets,
  } = useBudget();

  useEffect(() => {
    getAllBudgets();
  }, []);

  return (
    <>
      <div className="px-4 mt-10">
        <h1 className="text-3xl font-semibold">My Budgets</h1>

        <div className="flex gap-[6px] flex-wrap w-full mt-5">
          <div
            onClick={() => setIsDialogOpen(true)}
            className="flex flex-col justify-center items-center w-full md:w-[48%] lg:w-[33%] hover:bg-gray-100 border border-dashed p-4 rounded-md mb-2 text-xl font-semibold cursor-pointer"
          >
            <span>+</span>
            <span>Create New Budget</span>
          </div>
          {budgets === false ? (
            <>
              <BudgetCardSkeleton
                className={"h-32 w-full md:w-[48%] lg:w-[33%] p-4"}
              />
              <BudgetCardSkeleton
                className={"h-32 w-full md:w-[48%] lg:w-[33%] p-4"}
              />
            </>
          ) : budgets.length > 0 ? (
            <>
              {budgets.map((budget, index) => (
                <BudgetCard key={index} budget={budget} />
              ))}
            </>
          ) : (
            <div className="text-2xl items-center flex px-4">😔 No Budget Found</div>
          )}
        </div>
      </div>

      {isDialogOpen && (
        <>
          <div className="overlay" onClick={closeDialog}></div>
          <BudgetDialog
            budgets={budgets}
            setBudgets={setBudgets}
            onClose={closeDialog}
          />
        </>
      )}
    </>
  );
};

export default Budget;
