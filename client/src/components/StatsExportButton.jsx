import React from 'react';
import { getOverviewApi, getBarChartDataApi, getLatestBudgetsApi, getLatestExpensesApi } from '../api/stats.api';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const StatsExportButton = () => {

  const fetchData = async () => {
    try {
      const overview = await getOverviewApi();
      const barChartData = await getBarChartDataApi();
      const latestBudgets = await getLatestBudgetsApi();
      const latestExpenses = await getLatestExpensesApi();
      return { overview, barChartData, latestBudgets, latestExpenses };
    } catch (error) {
      console.error('Error fetching data', error);
      return null;
    }
  };

  const transformDataForSheet = (data) => {
    if (Array.isArray(data)) {
      return data;
    } else if (typeof data === 'object') {
      return [data];
    }
    return [];
  };

  const isDataEmpty = (data) => {
    return (
      !data ||
      (Array.isArray(data) && data.length === 0) ||
      (typeof data === 'object' && Object.keys(data).length === 0)
    );
  };

  const exportToExcel = async () => {
    const data = await fetchData();

    if (data) {
      const { overview, barChartData, latestBudgets, latestExpenses } = data;
      const latestExpensesData = latestExpenses.last3Expenses;

      // Check if latestExpensesData is empty
      if (!latestExpensesData || latestExpensesData.length === 0) {
        alert("You currently have no expenses data to export.");
        console.log("No expenses data to export:", latestExpensesData);
        return;
      } else {
        console.log('Data Printed', latestExpensesData)
      }


      const workbook = XLSX.utils.book_new();

      if (!isDataEmpty(overview)) {
        const overviewSheetData = transformDataForSheet(overview);
        const overviewSheet = XLSX.utils.json_to_sheet(overviewSheetData);
        XLSX.utils.book_append_sheet(workbook, overviewSheet, 'Overview');
      }

      if (!isDataEmpty(barChartData)) {
        const barChartDataSheetData = transformDataForSheet(barChartData);
        const barChartDataSheet = XLSX.utils.json_to_sheet(barChartDataSheetData);
        XLSX.utils.book_append_sheet(workbook, barChartDataSheet, 'Bar Chart Data');
      }

      if (!isDataEmpty(latestBudgets)) {
        const latestBudgetsSheetData = transformDataForSheet(latestBudgets);
        const latestBudgetsSheet = XLSX.utils.json_to_sheet(latestBudgetsSheetData);
        XLSX.utils.book_append_sheet(workbook, latestBudgetsSheet, 'Latest Budgets');
      }

      if (!isDataEmpty(latestExpensesData)) {
        const latestExpensesSheetData = transformDataForSheet(latestExpensesData);
        const latestExpensesSheet = XLSX.utils.json_to_sheet(latestExpensesSheetData);
        XLSX.utils.book_append_sheet(workbook, latestExpensesSheet, 'Latest Expenses');
      }

      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });

      saveAs(dataBlob, 'stats_data.xlsx');
    }
  };

  return (
    <button
      onClick={exportToExcel}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      Export to Excel
    </button>
  );
};

export default StatsExportButton;

