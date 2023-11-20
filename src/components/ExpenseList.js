import React from "react";

const ExpenseList = ({ expenses }) => {
  return (
    <ul className="list-decimal list-inside">
      {expenses.map((expense) => (
        <li key={expense.id} className="mb-2 border p-2 bg-slate-200 rounded-md text-xl ">
          {expense.name}:  {expense.cost} Rs
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;
