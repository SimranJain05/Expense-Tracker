import axios from "axios";
// import API_BASE_URL from "../config/API.config";
// import dotenv from 'dotenv';
// dotenv.config();
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const getUserAllExpenses = async () => {
  try {
    const response = await axios.get(`${VITE_API_URL}/api/expense/get`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getExpensesByBudgetApi = async (budgetId) => {
  try {
    const response = await axios.get(
      `${VITE_API_URL}/api/expense/get/budget/${budgetId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const addExpenseApi = async (body) => {
  try {
    const response = await axios.post(`${VITE_API_URL}/api/expense/add`, body, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateUserExpensesApi = async (expenseId, data) => {
  try {
    const response = await axios.put(
      `${VITE_API_URL}/api/expense/update/${expenseId}`,
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteUserExpensesApi = async (expenseId) => {
  try {
    const response = await axios.delete(
      `${VITE_API_URL}/api/expense/delete/${expenseId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
