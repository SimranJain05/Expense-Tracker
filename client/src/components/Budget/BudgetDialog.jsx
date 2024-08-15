import React, { useState, useEffect } from "react";
import CrossIcon from "../../interface/Svgs/CrossIcon";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/slices/loading.slice";
import { setError } from "../../redux/slices/error.slice";
import { setSuccess } from "../../redux/slices/success.slice";
import { addBudgetsApi } from "../../api/budget.api";
import EmojiPicker from "emoji-picker-react";

const BudgetDialog = (props) => {
  const { budgets, setBudgets, onClose } = props;
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [emoji, setEmoji] = useState("💸");
  const [showEmoji, setShowEmoji] = useState(false);
  const disptach = useDispatch();

  const handleCreateBudget = async (e) => {
    e.preventDefault();
    disptach(setLoading(true));
    const body = { name, amount, emoji };
    const res = await addBudgetsApi(body);
    if (!res.success) {
      disptach(setError(res.message));
    } else {
      res.budget.items = 0;
      res.budget.spending = 0;
      setBudgets([...budgets, res.budget]);
      disptach(setSuccess(res.message));
    }
    onClose();
    disptach(setLoading(false));
  };

  return (
    <div
      onClick={() => onClose()}
      className="flex items-center justify-center fixed top-0 left-0 bg-black bg-opacity-50 z-10 w-full h-screen"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          setShowEmoji(false);
        }}
        className="bg-white rounded-lg p-4 min-w-[280px] w-1/2 max-w-[800px]"
      >
        <div className="flex justify-end">
          <button
            onClick={onClose}
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <CrossIcon />
          </button>
        </div>
        <form onSubmit={handleCreateBudget} className="flex flex-col gap-2">
          <h3 className="text-2xl font-semibold">Create New Budget</h3>
          <div onClick={(e) => e.stopPropagation()} className="relative mt-5">
            <button
              onClick={() => setShowEmoji(true)}
              type="button"
              className="text-4xl p-2 bg-gray-100 rounded-md"
            >
              {emoji}
            </button>
            {showEmoji && (
              <div className="absolute top-0 -left-5 sm:left-0">
                <EmojiPicker
                  height={300}
                  onEmojiClick={(e) => {
                    setEmoji(e.emoji);
                    setShowEmoji(false);
                  }}
                />
              </div>
            )}
          </div>
          <label className="mt-5">Budget Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter budget name"
            required
            className="p-2 focus:outline-none border rounded"
          />
          <label>Budget Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter budget amount"
            required
            min={1}
            max={1000000}
            className="p-2 focus:outline-none border rounded"
          />
          <button
            type="submit"
            className="bg-gray-900 hover:bg-gray-800 rounded py-2 px-4 text-center text-white cursor-pointer"
          >
            Create Budget
          </button>
        </form>
      </div>
    </div>
  );
};

export default BudgetDialog;
