import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

import { useContext } from 'react';
import { Context } from '../../ContextProvider';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      display: true,
    },
    title: {
      display: true,
      text: '% Performance',
    },
  },
};

export const data = {
  labels: ['Alpha', 'Highlans', 'Mara'],
  datasets: [
    {
      data: [88, 91, 83],
      backgroundColor: [
        '#2563eb',
        '#4338ca',
        '#172554',
        '#172554',
        '#1d4ed8',
        '#1d4ed8',
      ],
    },
  ],
};
  
  export default function Pie() {
    let { Filters, HotelData } = useContext(Context);
    let [filter, setFilter] = Filters;
    let [hotelData, setHotelData] = HotelData;

    return (
        <PolarArea data={data} options={options} />
    );
  }