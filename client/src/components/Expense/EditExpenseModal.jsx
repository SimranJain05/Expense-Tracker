import React from "react";

export default function EditExpenseModal(props) {
  const { closePopup, selectedExpense, setSelectedExpense, handleSubmit } =
    props;

  const handleOuterClick = (e) => {
    if (e.target.className === "popup") {
      closePopup();
    }
  };

  return (
    <div className="popup" onClick={handleOuterClick}>
      <form onSubmit={handleSubmit} className="popup-content">
        <span className="close" onClick={closePopup}>
          &times;
        </span>
        <h2>Edit Expense</h2>
        <p>
          Name{" "}
          <input
            required
            type="text"
            onChange={(e) => {
              setSelectedExpense({
                _id: selectedExpense._id,
                name: e.target.value,
                amount: selectedExpense.amount,
                budget: selectedExpense.budget,
                change: true,
              });
            }}
            defaultValue={selectedExpense.name}
          />
        </p>
        <p>
          Amount{" "}
          <input
            required
            type="number"
            min="0"
            defaultValue={selectedExpense.amount}
            onChange={(e) => {
              setSelectedExpense({
                _id: selectedExpense._id,
                name: selectedExpense.name,
                amount: e.target.value,
                budget: selectedExpense.budget,
                change: true,
              });
            }}
            onKeyPress={(e) => e.charCode === 45 && e.preventDefault()}
          />
        </p>
        <button type="submit">Update Expense</button>
      </form>
    </div>
  );
}
