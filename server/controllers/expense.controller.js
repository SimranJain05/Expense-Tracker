import Expense from "../models/Expense.Model.js";
import errorHandler from "../errors/error.js";
import Budget from "../models/Budget.Model.js";
import mongoose from "mongoose";

export const getExpense = async (req, res, next) => {
  try {
    const { expensesIds } = req;
    let expenses = [];
    if (expensesIds.length > 0) {
      expenses = await Expense.find({ _id: { $in: expensesIds } }).sort({
        date: -1,
      });
    }
    res
      .status(200)
      .send({ success: true, message: "Expenses retrieved", expenses });
  } catch (error) {
    next(error);
  }
};

export const getExpensesByBudget = async (req, res, next) => {
  try {
    const { budgetId } = req.params;
    const userId = req.userId;

    if (!mongoose.Types.ObjectId.isValid(budgetId)) {
      return next(errorHandler(404, "Invalid Id"));
    }

    const budgetData = await Budget.findById(budgetId);
    if (!budgetData) {
      return next(errorHandler(400, "Budget not found"));
    }

    if (budgetData.user.toString() != userId) {
      return next(errorHandler(404, "This budget does not belong to you."));
    }

    const expenses = await Expense.find({ budget: budgetId });
    res
      .status(200)
      .send({ success: true, message: "Expenses Retrieved", expenses });
  } catch (error) {
    next(error);
  }
};

export const addExpense = async (req, res, next) => {
  try {
    const { name, amount, date, budget } = req.body;
    const userId = req.userId;

    if (!mongoose.Types.ObjectId.isValid(budget)) {
      return next(errorHandler(400, "Invalid Budget id"));
    }
    const budgetData = await Budget.findById(budget);
    if (!budgetData) {
      return next(errorHandler(404, "Budget not found"));
    }

    if (budgetData.user.toString() !== userId) {
      return next(
        errorHandler(
          400,
          "Forbidden! You are not allowed to add expense in this budget"
        )
      );
    }

    const currentExpenses = await Expense.find({ budget }).select("amount");
    const totalExpenses = currentExpenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );

    if (totalExpenses + amount > budgetData.amount) {
      return next(
        errorHandler(400, `Total spendings exceed the budget amount`)
      );
    }

    const newExpense = new Expense({ name, amount, date, budget });
    const savedExpense = await newExpense.save();
    res
      .status(201)
      .send({ success: true, message: "Expense Added", savedExpense });
  } catch (error) {
    next(error);
  }
};

export const updateExpense = async (req, res, next) => {
  try {
    const { expenseId } = req.params;
    const { name, amount, date, budget } = req.body;
    const { expensesIds } = req;

    if (!mongoose.Types.ObjectId.isValid(expenseId)) {
      return next(errorHandler(400, "Invalid expense id"));
    }
    if (!mongoose.Types.ObjectId.isValid(budget)) {
      return next(errorHandler(400, "Invalid budget id"));
    }

    let expenseToUpdate = false;
    for (const _expenseId of expensesIds) {
      if (_expenseId.toString() === expenseId) {
        expenseToUpdate = true;
        break;
      }
    }

    if (!expenseToUpdate) {
      return next(
        errorHandler(403, "You are not allowed to update this expense")
      );
    }

    const budgetData = await Budget.findById(budget);
    if (!budgetData) {
      return next(errorHandler(404, "Budget not found"));
    }

    const currentExpenses = await Expense.find({ budget }).select("amount");
    const totalExpenses = currentExpenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );

    const expenseData = await Expense.findById(expenseId);
    if (expenseData.budget.toString() !== budgetData._id.toString()) {
      return next(
        errorHandler(400, "This Expense does not belongs to the given budget")
      );
    }
    
    if (
      totalExpenses + parseInt(amount) - expenseData.amount >
      budgetData.amount
    ) {
      return next(
        errorHandler(
          400,
          `Total expenses exceed the budget amount Limit: ${
            budgetData.amount - totalExpenses + expenseData.amount
          }`
        )
      );
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
      expenseId,
      { name, amount, date, budget },
      { new: true }
    );

    res
      .status(200)
      .send({ success: true, message: "Expense Updated", updatedExpense });
  } catch (error) {
    next(error);
  }
};

export const deleteExpense = async (req, res, next) => {
  try {
    const { expenseId } = req.params;
    const { expensesIds } = req;

    if (!expenseId) {
      return next(errorHandler(400, "Id is required"));
    }

    if (!mongoose.Types.ObjectId.isValid(expenseId)) {
      return next(errorHandler(400, "Invalid expense id"));
    }

    let expenseToDelete = false;
    for (const _expenseId of expensesIds) {
      if (_expenseId.toString() === expenseId) {
        expenseToDelete = true;
        break;
      }
    }

    if (!expenseToDelete) {
      return next(
        errorHandler(403, "You are not allowed to delete this expense")
      );
    }

    const deletedExpense = await Expense.findByIdAndDelete(expenseId);
    if (!deletedExpense) {
      return next(errorHandler(404, "Expense not found"));
    }

    res.status(200).send({ success: true, message: "Expense deleted" });
  } catch (error) {
    next(error);
  }
};
