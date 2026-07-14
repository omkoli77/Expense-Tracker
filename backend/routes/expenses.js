const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

// GET /api/expenses -> get all expenses (most recent first)
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1, createdAt: -1 });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch expenses", error: err.message });
  }
});

// POST /api/expenses -> add a new expense
router.post("/", async (req, res) => {
  try {
    const { amount, description, category, date } = req.body;

    const expense = new Expense({ amount, description, category, date });
    const savedExpense = await expense.save();

    res.status(201).json(savedExpense);
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: "Validation failed", errors: messages });
    }
    res.status(500).json({ message: "Failed to create expense", error: err.message });
  }
});

// DELETE /api/expenses/:id -> delete an expense by id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Expense.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ message: "Expense deleted", id });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid expense id" });
    }
    res.status(500).json({ message: "Failed to delete expense", error: err.message });
  }
});

module.exports = router;
