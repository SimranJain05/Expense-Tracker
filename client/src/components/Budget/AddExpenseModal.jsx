import React, { useState } from "react";

export default function AddExpenseModal({ remaining, handleSubmit }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit({
          name: name,
          amount: parseInt(amount),
          date: Date.now(),
        });
      }}
      className="border p-5 rounded-lg"
    >
      <h2 className="font-bold text-lg">Add Expense</h2>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Name</h2>
        <input
          type="text"
          placeholder="e.g, Home Decor"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border w-full px-3 py-2 rounded-lg"
          required
        />
      </div>
      <div className="mt-2">
        {amount > remaining && (
          <p className="text-red-500 text-sm">Max Amount ${remaining}</p>
        )}
        <h2 className="text-black font-medium my-1">Expense Amount</h2>
        <input
          type="number"
          placeholder="e.g, 1000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border w-full px-3 py-2 rounded-lg"
          min={1}
          max={remaining}
          required
        />
      </div>
      <button
        disabled={!(name.length > 0 && amount > 0) || amount > remaining}
        type="submit"
        className="mt-3 w-full bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 disabled:bg-opacity-50 disabled:cursor-not-allowed"
      >
        Add new Expense
      </button>
    </form>
  );
}
