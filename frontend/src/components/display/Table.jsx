import { useContext, useEffect } from "react";
import { Context } from "../../ContextProvider";

export default function Table(){
    let { DisplayData } = useContext(Context);
    let [displayData, setDisplayData] = DisplayData;
    useEffect(() => {
        // console.log('From table',hotelData);
    },[displayData]);

    return(
        <table class="w-full text-sm text-left text-gray-400">
            <thead class="text-xs text-gray-100 uppercase bg-blue-900 ">
                <tr>
                    {
                        displayData.table.cols.map((col)=>{return(
                            <th scope="col" class="px-6 py-3">
                                {col}
                            </th>
                        )})
                    }
                </tr>
            </thead>
            <tbody>
                {
                    displayData.table.rows.map((row, index) => {
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