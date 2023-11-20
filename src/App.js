import React, { useState, useEffect } from "react";
import ExpenseList from "./components/ExpenseList";

const App = () => {
  const [budget, setBudget] = useState(2000);
  const [remaining, setRemaining] = useState(2000);
  const [spent, setSpent] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(savedExpenses);
  }, []);

  useEffect(() => {
    const totalSpent = expenses.reduce(
      (total, expense) => total + expense.cost,
      0
    );
    setSpent(totalSpent);
    setRemaining(budget - totalSpent);

    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses, budget]);

  const handleAddExpense = () => {
    if (name.trim() === "" || isNaN(cost) || cost <= 0) {
      alert("Please enter valid expense details.");
      return;
    }

    const newExpense = {
      id: expenses.length + 1,
      name,
      cost: parseFloat(cost),
    };
    setExpenses([...expenses, newExpense]);
    setName("");
    setCost("");
  };

  return (
    <div className="max-w-2/3">
      <div className="container mx-auto mt-8">
        <h1 className="text-4xl font-bold text-center mb-6">Budget Planner</h1>

        <div className="flex justify-around mb-6">
          <div className="text-center border p-2">
            <h2 className="text-lg font-semibold">Budget:</h2>
            <p className="text-xl">{budget} Rs</p>
          </div>
          <div className="text-center border p-2">
            <h2 className="text-lg font-semibold">Remaining:</h2>
            <p className="text-xl">{remaining} Rs</p>
          </div>
          <div className="text-center border p-2">
            <h2 className="text-lg font-semibold">Spent:</h2>
            <p className="text-xl">{spent} Rs</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4">Expenses:-</h2>
        <ExpenseList expenses={expenses} />

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-300">
            Adding data to List...
          </h3>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Name:</label>
            <input
              type="text"
              className="w-full border p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Cost:</label>
            <input
              type="number"
              className="w-full border p-2"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleAddExpense}
          >
            Add Expense
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
