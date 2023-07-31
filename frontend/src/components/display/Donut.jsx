import { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  datasets: [
    {
      data: [19, 3, 5, 2],
      //backgroundColor for dark mode
      backgroundColor: [
        '#2563eb',
        '#4338ca',
        '#172554',
        '#1d4ed8',
      ],
      borderColor: [
        '#172554',
        '#2e1065',
        '#042f2e',
        '#1d4ed8',
      ],
      borderWidth: 1,
    },
  ],
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
};
const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom', // Display the legend (labels) at the bottom
      },
      title: {
        display: true,
        text: 'Average Sales',
      },
    },
  };
export default function Donut() {
  return (
      <Doughnut data={data} options={options} />
  )
}