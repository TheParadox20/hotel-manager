import { useContext } from "react";
import { Context } from "../../ContextProvider";

export default function Table(){
    let { HotelData, Filters } = useContext(Context);
    let [hotelData, setHotelData] = HotelData;
    let [filter, setFilter] = Filters;

    let rows = hotelData.slice(filter.start,filter.end).map(row=>{
       return(
        <tr class="bg-gray-800 border-b border-gray-700">
            <td class="px-6 py-4 whitespace-nowrap">
            </td>
        </tr>
       )
    })

    return(
        <table class="w-full text-sm text-left text-gray-400 table-auto">
            <thead class="text-xs text-gray-100 uppercase bg-blue-900 sticky top-0 h-min">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Hotel
                    </th>
                    {
                        ["Section","Supervisor","waitstuff"].slice(0,filter.depth.length).map((col)=>{return(
                            <th scope="col" class="px-6 py-3">
                                {col}
                            </th>
                        )})
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
                    rows
                }
            </tbody>
        </table>
    );
}