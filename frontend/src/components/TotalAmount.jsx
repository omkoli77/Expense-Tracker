export default function TotalAmount({ total, count }) {
  return (
    <div className="relative bg-ink text-paper rounded-xl px-6 py-6 sm:px-8 sm:py-7 overflow-hidden">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <p className="text-xs uppercase tracking-widest text-paper/60 font-medium">
            Total spent
          </p>
          <p className="font-mono text-4xl sm:text-5xl font-semibold mt-1 tabular-nums">
            ₹{total.toFixed(2)}
          </p>
        </div>
        <p className="text-sm text-paper/60 font-mono">
          across {count} {count === 1 ? "expense" : "expenses"}
        </p>
      </div>
      {/* Perforated / receipt-tear edge */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-receipt-edge opacity-30" />
    </div>
  );
}
