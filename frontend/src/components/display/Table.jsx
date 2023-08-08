import { useContext } from "react";
import { Context } from "../../ContextProvider";

export default function Table(){
    let { HotelData, Filters } = useContext(Context);
    let [hotelData, setHotelData] = HotelData;
    let [filter, setFilter] = Filters;

    let compute = ()=>{//creates new 2d array with the required data
        let sum = (selection,date)=>{
            let targets = 0
            let actuals = 0
            hotelData.forEach(row => {
                if(row[filter.depth[0]]==selection && row[row.length-1]==date){
                    targets+=row[4]
                    actuals+=row[5]
                }
            });
            let variance = targets-actuals
            let performance = (variance/(targets==0?1:targets) * 100).toFixed(2)+'%'
            return [targets,actuals,variance,performance]
        }
        let dates = [...new Set(hotelData.map(item=>item[item.length-1]))];
        let items = filter.depth.length==1?[...new Set(hotelData.map(item=>item[filter.depth[0]]))]:[filter.depth[1]];
        let data = [];
        for(let i=0;i<items.length;i++){
            for(let j=0;j<dates.length;j++){
                data.push([items[i],...sum(items[i],dates[j]),dates[j]]);
            }
        }
        return data
    }

    return(
        <table class="w-full text-sm text-left text-gray-400 table-auto">
            <thead class="text-xs text-gray-100 uppercase bg-blue-900 sticky top-0 h-min">
                <tr>
                    {
                        filter.depth.length==0?
                        ["Hotel","Section","Supervisor","waitstuff"].map((col)=>{return(
                            <th scope="col" class="px-6 py-3">
                                {col}
                            </th>
                        )}):
                        <th scope="col" class="px-6 py-3">
                            {["Hotel","Section","Supervisor","waitstuff"][filter.depth[0]]}
                        </th>

                    }
                    {
                        ["Target","Actual","Variance","% Performance","Date"].map((col)=>{return(
                            <th scope="col" class="px-6 py-3">
                                {col}
                            </th>
                        )})
                    }
                </tr>
            </thead>
            <tbody>
                {
                    filter.depth.length==0?
                    hotelData.map(row=>{
                        row.splice(6,0,...[(row[5]-row[4]),(row[5]/row[4]*100).toFixed(2)+'%'])
                        return(
                         <tr class="bg-gray-800 border-b border-gray-700">
                             {row.map(col=>{
                                    return(
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            {col}
                                        </td>
                                    )
                             })}
                         </tr>
                        )
                    })
                    :
                    compute().map(row=>{
                        return(
                         <tr class="bg-gray-800 border-b border-gray-700">
                             {row.map(col=>{
                                    return(
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            {col}
                                        </td>
                                    )
                             })}
                         </tr>
                        )
                    })
                }
            </tbody>
        </table>
    );
}