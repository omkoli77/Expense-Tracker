import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/expenses";

export const getExpenses = async () => {
  const res = await axios.get(API_BASE_URL);
  return res.data;
};

export const addExpense = async (expense) => {
  const res = await axios.post(API_BASE_URL, expense);
  return res.data;
};

export const deleteExpense = async (id) => {
  const res = await axios.delete(`${API_BASE_URL}/${id}`);
  return res.data;
};
