import axios from "axios";
// import API_BASE_URL from "../config/API.config";
// import dotenv from 'dotenv';
// dotenv.config();
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const getUserAllBudgetsApi = async () => {
  try {
    const response = await axios.get(`${VITE_API_URL}/api/budget/get`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getBudgetByIdApi = async (budgetId) => {
  try {
    const response = await axios.get(
      `${VITE_API_URL}/api/budget/get/${budgetId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const addBudgetsApi = async (body) => {
  try {
    const response = await axios.post(`${VITE_API_URL}/api/budget/add`, body, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateBudgetApi = async (body) => {
  try {
    const response = await axios.put(
      `${VITE_API_URL}/api/budget/update`,
      body,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteBudgetApi = async (budgetId) => {
  try {
    const response = await axios.delete(
      `${VITE_API_URL}/api/budget/delete/${budgetId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
