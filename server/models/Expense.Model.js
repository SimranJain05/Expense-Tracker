import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  budget: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Budget",
    required: true,
  },
});

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
