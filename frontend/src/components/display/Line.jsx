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
let colours = ['#1d4ed8','#5b21b6','#3730a3','']
export default function Lyn() {
  let { Filters, HotelData } = useContext(Context);
  let [filter, setFilter] = Filters;
  let [hotelData, setHotelData] = HotelData;

  let labels = [...new Set(hotelData.map(item=>item[item.length-1]))];

  let compute = ()=>{
    let data = []
    let sum = (item)=>{//item==selection
      let totals = []
      for(let i=0;i<labels.length;i++){
        let total=0
        hotelData.forEach(row => {
          if(row[filter.depth[0]]==item && row[row.length-1]==labels[i]) total+=row[5]
        });
        totals.push(total)
      }
      return totals
    }
    let items = filter.depth.length==1?[...new Set(hotelData.map(item=>item[filter.depth[0]]))]:[filter.depth[1]];
    for(let i=0;i<items.length;i++){
      data.push(
        {
          label: items[i]==null?'All Hotels':items[i],
          data: sum(items[i]),
          cubicInterpolationMode: 'monotone',
          borderColor: colours[i],
        }
      );
    }
    return data
  }


const data = {
  labels,
  datasets: compute(),
};

  return(
        <Line options={options} data={data} />
  )
}
  