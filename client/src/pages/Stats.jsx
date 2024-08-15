import React, { useEffect } from "react";
import OverviewCard from "../components/Stats/OverviewCard";
import BudgetIcon from "../interface/Svgs/BudgetIcon";
import ExpenseIcon from "../interface/Svgs/ExpenseIcon";
import NumberIcon from "../interface/Svgs/NumberIcon";
import PieChartComponent from "../components/Stats/PieChartComponent";
import BudgetCard from "../components/Budget/BudgetCard";
import ExpenseTable from "../components/Expense/ExpenseTable";
import useStats from "../hooks/useStats";
import OverviewCardSkeleton from "../interface/skeletons/OverviewCardSkeleton";
import PieChartSkeleton from "../interface/skeletons/PieChartSkeleton";
import BudgetCardSkeleton from "../interface/BudgetCardSkeleton";
import ExpenseTableSkeleton from "../interface/ExpenseTableSkeleton";
import { useSelector } from "react-redux";
import StatsExportButton from "../components/StatsExportButton";

const Stats = () => {
  const { user } = useSelector((state) => state.user);
  const {
    totalBudget,
    totalSpend,
    numOfBudgets,
    pieChartData, 
    latestBudgets,
    latestExpenses,
    setLatestExpenses,
    getOverview,
    getPieChartData, 
    getLatestBudgets,
    getLatestExpenses,
  } = useStats();
  
  useEffect(() => {
    getOverview();
    getPieChartData(); 
    getLatestBudgets();
    getLatestExpenses();
  }, []);

  return (
    <>
      <div>
        <h1 className="px-6 pt-6 text-4xl font-bold">Hi, {user.name} 🖐️</h1>
        <p className="px-6 pt-2 text-gray-500">
          Here's what happenning with your money, Lets Manage your expense
        </p>

        <div className="p-2 flex justify-end">
          <StatsExportButton />
        </div>
      </div>
      <div className="stats">
        {totalBudget !== false ? (
          <OverviewCard
            heading={"Total Budget"}
            text={`Rs ${totalBudget}`}
            icon={
              <BudgetIcon
                className={"w-12 h-12 text-gray-900 hover:text-white p-2"}
              />
            }
          />
        ) : (
          <OverviewCardSkeleton />
        )}
        {totalSpend !== false ? (
          <OverviewCard
            heading={"Total Spend"}
            text={`Rs ${totalSpend}`}
            icon={
              <ExpenseIcon
                className={"w-12 h-12 text-gray-900 hover:text-white p-2"}
              />
            }
          />
        ) : (
          <OverviewCardSkeleton />
        )}
        {numOfBudgets !== false ? (
          <OverviewCard
            heading={"Number of Budgets"}
            text={numOfBudgets}
            icon={
              <NumberIcon
                className={"w-12 h-12 text-gray-900 hover:text-white p-2"}
              />
            }
          />
        ) : (
          <OverviewCardSkeleton />
        )}
        <div className="p-4 w-full flex flex-col md:flex-row gap-5">
          <div className="w-full md:w-2/3 flex flex-col gap-5">
            {pieChartData !== false ? (
              <div>
                <h1 className="text-xl text-gray-900 font-semibold w-[90%] mx-1 mb-2">
                  Spending Overview
                </h1>
                <PieChartComponent pieChartData={pieChartData} />
              </div>
            ) : (
              // <div>
              //   <h1>No Spending yet!</h1>
              //   <PieChartSkeleton />
              // </div>
              <PieChartSkeleton />
            )}
            <h1 className="text-xl text-gray-900 font-semibold w-[90%] mx-auto mb-2">
              Latest Expenses
            </h1>
            {latestExpenses !== false ? (
              latestExpenses.length == 0 ? (
                <h1 className="text-xl text-gray-900 font-semibold w-[90%] mx-auto mb-2">
                  😔 No Expense Found
                </h1>
              ) : (
                <div>
                  <ExpenseTable
                    expenses={latestExpenses}
                    setExpenses={setLatestExpenses}
                  />
                </div>
              )
            ) : (
              <ExpenseTableSkeleton />
            )}
          </div>
          <div className="w-full md:w-1/3">
            <div>
              <h1 className="text-xl text-gray-900 font-semibold mb-2">
                Latest Budgets
              </h1>
              {latestBudgets !== false ? (
                latestBudgets.length == 0 ? (
                  <h1 className="text-xl text-gray-900 font-semibold w-[90%] mx-auto mb-2">
                    😔 No Budget Found
                  </h1>
                ) : (
                  latestBudgets.map((latestBudget) => (
                    <div className="flex flex-col gap-2" key={latestBudget._id}>
                      <BudgetCard
                        budget={latestBudget}
                        className={"w-full md:w-full lg:w-full"}
                      />
                    </div>
                  ))
                )
              ) : (
                <BudgetCardSkeleton className={"mt-5"} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stats;


