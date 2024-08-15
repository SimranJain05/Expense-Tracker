import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import {
  addBudget,
  deleteBudget,
  getBudget,
  getBudgetByBudgetId,
  updateBudget,
} from "../controllers/budget.controller.js";

const router = express.Router();

router.get("/get", authenticate, getBudget); 
router.get("/get/:budgetId", authenticate, getBudgetByBudgetId);
router.post("/add", authenticate, addBudget); 
router.put("/update", authenticate, updateBudget);
router.delete("/delete/:budgetId", authenticate, deleteBudget);

export default router;
