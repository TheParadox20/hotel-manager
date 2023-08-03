import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
  
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import { useContext } from 'react';
import { Context } from '../../ContextProvider';
  
export const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Variance',
    },
  },
};

const labels = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Actual',
      data: [20],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Target',
      data: [27],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};
  
export default function Bur() {
  let { Filters, HotelData } = useContext(Context);
  let [filter, setFilter] = Filters;
  let [hotelData, setHotelData] = HotelData;
  
  return <Bar options={options} data={data} />;
}