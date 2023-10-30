import { useState, useEffect } from "react"

export default function Users(){
    let [users, setUsers] = useState([]);
    useEffect(()=>{},[])
    return(
        <div  className=" bg-gray-800 rounded py-4 px-4 overflow-x-scroll max-h-96 overflow-y-scroll">
            <h3 className="mb-6 font-semibold text-xl">User management</h3>
            <table className="w-full text-sm text-left text-gray-400 table-auto">
                <thead className="text-xs text-gray-100 uppercase bg-blue-900 sticky top-0">
                    <tr>
                        <th className="px-6 py-3">User</th>
                        <th className="px-6 py-3">role</th>
                        <th className="px-6 py-3"></th>
                        <th className="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user,index)=>{
                            return(
                                <tr className="bg-gray-800 border-b border-gray-700">
                                    <td className="px-6 py-4 whitespace-nowrap">{user[0]}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{roles[user[1]]}</td>
                                    <td className="md:px-6 py-2 md:py-0"><button className="py-2 w-full bg-gray-900 font-mono my-1 hover:uppercase">remove</button></td>
                                    <td className="md:px-6 py-2 md:py-0"><button className="py-2 w-full bg-gray-900 font-mono my-1 hover:uppercase">Change role</button></td>
                                </tr>
                            )
                        })
                    }
                    {
                        5-users.length>0?
                        [...Array(5-users.length)].map((item,index)=>{
                            return(
                                <tr className="bg-gray-800 border-b border-gray-700">
                                    <td className="px-6 py-4 whitespace-nowrap"></td>
                                </tr>
                            )})
                        :null
                    }
                </tbody>
            </table>
        </div>
    )
}