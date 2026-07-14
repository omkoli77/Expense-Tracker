const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [1, "Amount must be greater than 0"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: 200,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      enum: [
        "Food",
        "Transport",
        "Housing",
        "Utilities",
        "Entertainment",
        "Health",
        "Shopping",
        "Other",
      ],
      default: "Other",
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
