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
  maintainAspectRatio: false,
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
      label: 'Alpha',
      data: [65000, 59000, 70000, 81000, 56000, 55000, 40000],
      cubicInterpolationMode: 'monotone',
      borderColor: '#1d4ed8',
    },
    {
      label: 'Highlands',
      data: [28000, 48000, 40000, 79000, 86000, 27000, 90000],
      cubicInterpolationMode: 'monotone',
      borderColor: '#5b21b6',
    },
    {
      label: 'Mara',
      data: [48000, 58000, 65000, 79000, 76000, 87000, 80000],
      cubicInterpolationMode: 'monotone',
      borderColor: '#3730a3',
    },
  ],
};

export default function Lyn() {
  let { Filters, HotelData } = useContext(Context);
  let [filter, setFilter] = Filters;
  let [hotelData, setHotelData] = HotelData;

  return(
        <Line options={options} data={data} />
  )
}
  