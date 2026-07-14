import { useState } from "react";
import { CATEGORIES } from "../categoryStyles";

const today = () => new Date().toISOString().split("T")[0];

const emptyForm = {
  amount: "",
  description: "",
  category: "Food",
  date: today(),
};

export default function ExpenseForm({ onAdd, submitting }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const amountNum = parseFloat(form.amount);
    if (!form.description.trim()) {
      setError("Add a short description for this expense.");
      return;
    }
    if (!amountNum || amountNum <= 0) {
      setError("Enter an amount greater than 0.");
      return;
    }
    if (!form.date) {
      setError("Pick a date for this expense.");
      return;
    }

    try {
      await onAdd({
        amount: amountNum,
        description: form.description.trim(),
        category: form.category,
        date: form.date,
      });
      setForm(emptyForm);
    } catch (err) {
      setError(err?.response?.data?.message || "Couldn't save the expense. Try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-line rounded-xl p-5 sm:p-6 shadow-sm"
    >
      <h2 className="font-display font-semibold text-lg mb-4">Add an expense</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-muted mb-1">
            Description
          </label>
          <input
            id="description"
            name="description"
            type="text"
            placeholder="e.g. Groceries at the market"
            value={form.description}
            onChange={handleChange}
            className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal"
          />
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-muted mb-1">
            Amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-muted">
              ₹
            </span>
            <input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0.00"
              value={form.amount}
              onChange={handleChange}
              className="w-full rounded-lg border border-line bg-paper pl-7 pr-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal"
            />
          </div>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-muted mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-muted mb-1">
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            max={today()}
            className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal"
          />
        </div>
      </div>

      {error && (
        <p className="mt-3 text-sm text-rust bg-rust-light border border-rust/20 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-5 w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-teal hover:bg-teal-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium text-sm px-5 py-2.5 transition-colors"
      >
        {submitting ? "Adding…" : "Add expense"}
      </button>
    </form>
  );
}
