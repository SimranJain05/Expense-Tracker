import EmojiPicker from "emoji-picker-react";
import React, { useState } from "react";
import CrossIcon from "../../interface/Svgs/CrossIcon";
import { updateBudgetApi } from "../../api/budget.api";
import { useDispatch } from "react-redux";
import { setError } from "../../redux/slices/error.slice";
import { setSuccess } from "../../redux/slices/success.slice";
import { setLoading } from "../../redux/slices/loading.slice";

export default function EditBudgetModal({ budget, onClose }) {
  const [showEmoji, setShowEmoji] = useState(false);
  const [emoji, setEmoji] = useState(budget.emoji);
  const [name, setName] = useState(budget.name);
  const [amount, setAmount] = useState(budget.amount);
  const dispatch = useDispatch();

  const updateBudget = async (e) => {
    e.preventDefault();
    if (
      !(
        budget.amount === parseInt(amount) &&
        budget.emoji === emoji.toString() &&
        budget.name === name.toString()
      )
    ) {
      dispatch(setLoading(true));

      const body = {
        name,
        amount: parseInt(amount),
        emoji,
        budgetId: budget._id,
      };
      console.log(body);
      const res = await updateBudgetApi(body);
      if (!res.success) {
        dispatch(setError(res.message));
      } else {
        budget.name = name;
        budget.amount = amount;
        budget.emoji = emoji;
        dispatch(setSuccess(res.message));
      }
      dispatch(setLoading(false));
    }
    onClose();
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
        <form onSubmit={updateBudget} className="flex flex-col gap-2">
          <h3 className="text-2xl font-semibold">Edit Budget</h3>
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
          {amount < budget.spending && (
            <p className="text-red-500 text-sm">
              Min Amount ${budget.spending}
            </p>
          )}
          <label>Budget Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter budget amount"
            required
            min={budget.spending}
            max={1000000}
            className="p-2 focus:outline-none border rounded"
          />
          <button
            type="submit"
            disabled={
              name.length <= 0 ||
              amount < budget.spending ||
              (budget.amount === parseInt(amount) &&
                budget.emoji === emoji.toString() &&
                budget.name === name.toString())
            }
            className="bg-gray-900 hover:bg-gray-800 rounded py-2 px-4 text-center text-white cursor-pointer disabled:bg-opacity-50"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
