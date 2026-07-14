import { useEffect, useMemo, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import TotalAmount from "./components/TotalAmount";
import { getExpenses, addExpense, deleteExpense } from "./api/expenses";

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [loadError, setLoadError] = useState("");

  const fetchExpenses = async () => {
    try {
      setLoadError("");
      setLoading(true);
      const data = await getExpenses();
      setExpenses(data);
    } catch (err) {
      setLoadError(
        "Couldn't reach the server. Make sure the backend is running on the configured API URL."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAdd = async (expenseData) => {
    setSubmitting(true);
    try {
      const created = await addExpense(expenseData);
      setExpenses((prev) => [created, ...prev]);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await deleteExpense(id);
      setExpenses((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      setLoadError("Couldn't delete that expense. Try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const total = useMemo(
    () => expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0),
    [expenses]
  );

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-line bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-5">
          <p className="text-xs uppercase tracking-widest text-teal font-medium mb-1">
            Personal Ledger
          </p>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-ink">
            Expense Tracker
          </h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-6">
        <TotalAmount total={total} count={expenses.length} />

        {loadError && (
          <div className="bg-rust-light border border-rust/20 text-rust text-sm rounded-lg px-4 py-3">
            {loadError}
          </div>
        )}

        <ExpenseForm onAdd={handleAdd} submitting={submitting} />

        <ExpenseList
          expenses={expenses}
          onDelete={handleDelete}
          deletingId={deletingId}
          loading={loading}
        />
      </main>

      <footer className="max-w-3xl mx-auto px-4 sm:px-6 pb-8 text-center text-xs text-muted">
        MERN Expense Tracker — MongoDB · Express · React · Node
      </footer>
    </div>
  );
}
