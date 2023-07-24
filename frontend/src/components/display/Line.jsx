import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useContext } from 'react';
import { Context } from '../../ContextProvider';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    title: {
      display: true,
      text: 'Total sales',
    },
  },
};

const labels = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th'];

const data = {
  labels,
  datasets: [
    {
      label: 'Lounge',
      data: [65, 59, 70, 81, 56, 55, 40],
      cubicInterpolationMode: 'monotone',
      borderColor: 'rgb(75, 192, 192)',
    },
    {
      label: 'Balcony',
      data: [28, 48, 40, 19, 86, 27, 90],
      cubicInterpolationMode: 'monotone',
      borderColor: 'rgb(75, 0, 192)',
    },
  ],
};

export default function Lyn() {
  let { DisplayData } = useContext(Context);
  let [displayData, setDisplayData] = DisplayData;
  return(
        <Line options={options} data={data} />
  )
}
  