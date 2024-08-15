import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [1, "Amount must be atleast $1"],
    },
    emoji: {
      type: String,
      default: "💸",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Budget = mongoose.model("Budget", budgetSchema);

export default Budget;
