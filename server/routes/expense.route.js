import express from "express";

import {
  getExpense,
  addExpense,
  updateExpense,
  deleteExpense,
  getExpensesByBudget,
} from "../controllers/expense.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import getExpensesByUserId from "../middlewares/getExpensesByUserId.js";
const router = express.Router();

router.get("/get", authenticate, getExpensesByUserId, getExpense);
router.post("/add", authenticate, addExpense);
router.put(
  "/update/:expenseId",
  authenticate,
  getExpensesByUserId,
  updateExpense
);
router.delete(
  "/delete/:expenseId",
  authenticate,
  getExpensesByUserId,
  deleteExpense
);
router.get("/get/budget/:budgetId", authenticate, getExpensesByBudget);

export default router;
