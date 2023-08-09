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
  
export default function Bur() {
  let { Filters, HotelData } = useContext(Context);
  let [filter, setFilter] = Filters;
  let [hotelData, setHotelData] = HotelData;
  
  let options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${filter.depth.length<2?['Hotels','Sections','Supervisor','Waitstuff'][filter.depth.length==0?0:filter.depth[0]]:filter.depth[1]} Variance`,
      },
    },
  };
  let labels = [...new Set(hotelData.map(item=>item[item.length-1]))];
  console.log('Labels :: ',labels)

  let compute = ()=>{
    let actuals = []
    let targets = []
    for(let i=0;i<labels.length;i++){//for each day sum up the targets&actuals for a particular section
      //TODO: work on sorted data by date
      let actual = 0
      let target = 0
      hotelData.forEach(row => {
        if(row[row.length-1]==labels[i] && (filter.depth.length==2?row[filter.depth[0]]==filter.depth[1]:true)){
          actual+=row[5]
          target+=row[4]
        }
      });
      actuals.push(actual)
      targets.push(target)
    }
      
    return [
      {
        label: 'Actual',
        data: actuals,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',          
      },
      {
        label: 'Target',
        data: targets,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ];
  }

  let data = {
    labels,
    datasets: compute()
  };

  return <Bar options={options} data={data} />;
}