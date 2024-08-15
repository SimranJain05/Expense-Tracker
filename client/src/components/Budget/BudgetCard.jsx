import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { Link, useNavigate } from "react-router-dom";

const BudgetCard = ({ budget, className, link = true }) => {
  const { _id, name, amount, spending, items, emoji } = budget;
  const remaining = amount - spending;
  const spentPercentage = (spending / amount) * 100;

  return (
    <div
      className={`flex flex-col w-full md:w-[48%] lg:w-[33%] border p-4 rounded-md mb-2 ${className}`}
    >
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl p-2 bg-gray-100 rounded-full">{emoji}</span>
          <div className="flex flex-col">
            <span className="font-semibold text-lg">{name}</span>
            <span className="text-gray-500">
              {items} Item{items > 1 ? "s" : ""}
            </span>
          </div>
        </div>
        <div className="text-gray-900 font-semibold text-2xl">Rs {amount}</div>
      </div>
      <div className="text-gray-500 text-sm flex justify-between mt-5">
        <span>Rs {spending} spent</span>
        <span>Rs {remaining} remaining</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-md mt-2">
        <div
          className="bg-gray-900 h-2 rounded-md"
          style={{ width: `${spentPercentage}%` }}
        ></div>
      </div>
      {link && (
        <div className="w-full mt-5 flex justify-end">
          <Link
            to={`/dashboard/budget/detail/${_id}`}
            className="rounded text-gray-900 hover:underline"
          >
            view details
          </Link>
        </div>
      )}
    </div>
  );
};

export default BudgetCard;
