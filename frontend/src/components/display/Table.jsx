import { useContext } from "react";
import { Context } from "../../ContextProvider";

export default function Table(){
    let { HotelData } = useContext(Context);
    let [hotelData, setHotelData] = HotelData;

    return(
        <table class="w-full text-sm text-left text-gray-400">
            <thead class="text-xs text-gray-100 uppercase bg-blue-900 ">
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
                {
                    hotelData.map((row, index) => {
                        return (<tr key={index} class="border-b bg-gray-900 border-gray-700">
                            {
                                row.map((data, index) => {
                                    return <td class="px-6 py-4">{data}</td>
                                })
                            }
                        </tr>)}
                    )
                }
            </tbody>
        </table>
    );
}