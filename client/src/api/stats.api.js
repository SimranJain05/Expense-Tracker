import axios from "axios";
// import API_BASE_URL from "../config/API.config";
// import dotenv from 'dotenv';
// dotenv.config();
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const getOverviewApi = async () => {
  try {
    const response = await axios.get(`${VITE_API_URL}/api/stats/overview`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getBarChartDataApi = async () => {
  try {
    const response = await axios.get(`${VITE_API_URL}/api/stats/barchart`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getPieChartDataApi = async () => { // Add this function
  try {
    const response = await axios.get(`${VITE_API_URL}/api/stats/piechart`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getLatestBudgetsApi = async () => {
  try {
    const response = await axios.get(
      `${VITE_API_URL}/api/budget/get?stat=true`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getLatestExpensesApi = async () => {
  try {
    const response = await axios.get(
      `${VITE_API_URL}/api/stats/recentExpenses`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
