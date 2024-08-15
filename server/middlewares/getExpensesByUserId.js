import Budget from "../models/Budget.Model.js";
import Expense from "../models/Expense.Model.js";

const getExpensesByUserId = async (req, res, next) => {
  try {
    const userId = req.userId;
    const budgets = await Budget.find({ user: userId });
    const expensesIds = [];
    for (const budget of budgets) {
      const expenseIds = await Expense.find({ budget }).select("_id");
      expensesIds.push(...expenseIds.map((expense) => expense._id));
    }
    req.expensesIds = expensesIds;
    next();
  } catch (error) {
    next(error);
  }
};

export default getExpensesByUserId;
