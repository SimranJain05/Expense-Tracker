import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// Function to generate a random color
const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Function to generate a list of colors
const generateColors = (numColors) => {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    colors.push(generateRandomColor());
  }
  return colors;
};

const PieChartComponent = ({ pieChartData }) => {
  const data = {
    labels: pieChartData.labels,
    // length: pieChartData.labels.length(),
    datasets: [
      {
        data: pieChartData.data,
        // backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF9F40", "#FF5733"],

        backgroundColor: generateColors(pieChartData.labels.length), // Generate dynamic colors
        hoverOffset: 4,

        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  // return <Pie data={data} />;
  return (
    <div style={{ width: "550px", height: "550px" ,  marginLeft: "150px"}}> {/* Adjust size here */}
      <Pie data={data} options={options}/>
    </div>
  );
};

export default PieChartComponent;




 
