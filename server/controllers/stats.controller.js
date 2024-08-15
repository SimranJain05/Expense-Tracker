import Budget from "../models/Budget.Model.js";
import Expense from "../models/Expense.Model.js";

export const overview = async (req, res, next) => {
  try {
    const userId = req.userId;

    const budgets = await Budget.find({ user: userId });
    const totalBudgetAmount = budgets.reduce(
      (sum, budget) => sum + budget.amount,
      0
    );

    let totalSpendingAmount = 0;
    for (const budget of budgets) {
      const expenses = await Expense.aggregate([
        { $match: { budget: budget._id } },
        { $group: { _id: "$budget", totalSpending: { $sum: "$amount" } } },
      ]);
      if (expenses.length > 0) {
        totalSpendingAmount += expenses[0].totalSpending;
      }
    }

    res.status(200).send({
      success: true,
      netBudgetAmount: totalBudgetAmount,
      netSpendingAmount: totalSpendingAmount,
      netBudgets: budgets.length,
      message: "overview of expense sent",
    });
  } catch (error) {
    next(error);
  }
};

export const barchart = async (req, res, next) => {
  try {
    const userId = req.userId;

    const budgets = await Budget.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5);

    const budgetNames = [];
    const spentAmounts = [];
    const remainingAmounts = [];

    for (const budget of budgets) {
      const expenses = await Expense.aggregate([
        { $match: { budget: budget._id } },
        { $group: { _id: "$budget", totalSpending: { $sum: "$amount" } } },
      ]);

      const totalSpending = expenses.length > 0 ? expenses[0].totalSpending : 0;

      budgetNames.push(budget.name);
      spentAmounts.push(totalSpending);
      remainingAmounts.push(budget.amount - totalSpending);
    }

    res.status(200).send({
      success: true,
      budgetNames,
      spentAmounts,
      remainingAmounts,
      message: "barchart of expense sent",
    });
  } catch (error) {
    next(error);
  }
};

export const piechart = async (req, res, next) => {
  try {
    const userId = req.userId;

    const budgets = await Budget.find({ user: userId });

    const labels = [];
    const data = [];

    for (const budget of budgets) {
      const expenses = await Expense.aggregate([
        { $match: { budget: budget._id } },
        { $group: { _id: "$budget", totalSpending: { $sum: "$amount" } } },
      ]);

      const totalSpending = expenses.length > 0 ? expenses[0].totalSpending : 0;

      labels.push(budget.name);
      data.push(totalSpending);
    }

    res.status(200).send({
      success: true,
      labels,
      data,
      message: "piechart data sent",
    });
  } catch (error) {
    next(error);
  }
};

export const recentBudgets = async (req, res, next) => {
  try {
    const userId = req.userId;
    const last3Budgets = await Budget.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(3);

    res.status(200).send({
      success: true,
      message: "latest 3 budgets sent",
      last3Budgets,
    });
  } catch (error) {
    next(error);
  }
};

export const recentExpenses = async (req, res, next) => {
  try {
    const userId = req.userId;

    const userBudgets = await Budget.find({ user: userId });

    const promises = userBudgets.map(async (budget) => {
      const expenses = await Expense.find({ budget: budget._id })
        .sort({ date: -1 })
        .limit(3);
      return expenses;
    });

    const expensesByBudget = await Promise.all(promises);

    const allExpenses = expensesByBudget.flat();

    allExpenses.sort((a, b) => b.date - a.date);

    const last3Expenses = allExpenses.slice(0, 3);

    res.status(200).send({
      success: true,
      last3Expenses,
      message: "Latest 3 expenses sent",
    });
  } catch (error) {
    next(error);
  }
};
