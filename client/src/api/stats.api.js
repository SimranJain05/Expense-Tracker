import axios from "axios";
import API_BASE_URL from "../config/API.config";

export const getOverviewApi = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/stats/overview`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getBarChartDataApi = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/stats/barchart`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getPieChartDataApi = async () => { // Add this function
  try {
    const response = await axios.get(`${API_BASE_URL}/api/stats/piechart`, {
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
      `${API_BASE_URL}/api/budget/get?stat=true`,
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
      `${API_BASE_URL}/api/stats/recentExpenses`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
