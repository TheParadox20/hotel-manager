import { useContext } from "react";
import { Context } from "../../ContextProvider";

export default function Table(){
    let { HotelData, Filters } = useContext(Context);
    let [hotelData, setHotelData] = HotelData;
    let [filter, setFilter] = Filters;

    return(
        <table class="w-full text-sm text-left text-gray-400 table-auto">
            <thead class="text-xs text-gray-100 uppercase bg-blue-900 sticky top-0 h-min">
                <tr>
                    {
                        ["Hotel","Section","Supervisor","waitstuff","Target","actual","timestamp"].map((col)=>{return(
                            <th scope="col" class="px-6 py-3">
                                {col}
                            </th>
                        )})
                    }
                </tr>
            </thead>
            <tbody>
                {//filter the data based on the filter
                    hotelData.filter((item)=>{
                        let flag = true;
                        filter.depth.forEach((depth,index)=>{
                            if(item[index]!=depth) flag = false
                        })
                        return flag
                    }
                    ).map((item)=>{return(
                        <tr class="bg-gray-800 border-b border-gray-700">
                            {
                                item.map((col)=>{return(
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        {col}
                                    </td>
                            )})}
                        </tr>
                    )})
                }
            </tbody>
        </table>
    );
}