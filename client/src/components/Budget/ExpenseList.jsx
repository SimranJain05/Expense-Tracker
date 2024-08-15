import React, { useState } from "react";

const ExpenseList = ({ expenses, editExpense, deleteExpense }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedDescription, setEditedDescription] = useState("");
  const [editedAmount, setEditedAmount] = useState("");

  const handleEditClick = (expense) => {
    setEditingId(expense.id);
    setEditedDescription(expense.description);
    setEditedAmount(expense.amount);
  };

  const handleSave = (event) => {
    event.preventDefault();
    editExpense({ id: editingId, description: editedDescription, amount: editedAmount });
    setEditingId(null);
    setEditedDescription("");
    setEditedAmount("");
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedDescription("");
    setEditedAmount("");
  };

  return (
    <div className="expense-list">
      {expenses.map((expense) => (
        <div key={expense.id} className="expense-item">
          {editingId === expense.id ? (
            <form onSubmit={handleSave} onReset={handleCancel}>
              <input
                type="text"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
              <input
                type="number"
                value={editedAmount}
                onChange={(e) => setEditedAmount(e.target.value)}
              />
              <button type="submit" className="edit">Save</button>
              <button type="reset">Cancel</button>
            </form>
          ) : (
            <>
              <span className="description">{expense.description}</span>
              <span className="amount">${expense.amount}</span>
              <button onClick={() => handleEditClick(expense)} className="edit">Edit</button>
              <button onClick={() => deleteExpense(expense.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
