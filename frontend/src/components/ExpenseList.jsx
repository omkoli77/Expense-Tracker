import ExpenseItem from "./ExpenseItem";

export default function ExpenseList({ expenses, onDelete, deletingId, loading }) {
  if (loading) {
    return (
      <div className="bg-white border border-line rounded-xl p-8 text-center text-muted text-sm">
        Loading expenses…
      </div>
    );
  }

  if (expenses.length === 0) {
    return (
      <div className="bg-white border border-line rounded-xl p-8 text-center">
        <p className="text-ink font-medium">No expenses yet</p>
        <p className="text-sm text-muted mt-1">
          Add your first expense above to start the ledger.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-line rounded-xl overflow-hidden shadow-sm">
      <div className="px-5 pt-4 pb-1 flex items-center justify-between">
        <h2 className="font-display font-semibold text-lg">Expenses</h2>
        <span className="text-xs text-muted font-mono">
          {expenses.length} {expenses.length === 1 ? "entry" : "entries"}
        </span>
      </div>
      <ul className="divide-y divide-line px-4">
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense._id}
            expense={expense}
            onDelete={onDelete}
            deleting={deletingId === expense._id}
          />
        ))}
      </ul>
    </div>
  );
}
