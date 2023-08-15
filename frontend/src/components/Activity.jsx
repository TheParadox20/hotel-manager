import { useState, useEffect} from "react"
import { initFlowbite } from 'flowbite'
import Sales from "./activities/Sales"
import Users from "./activities/Users"
import Inventory from "./activities/Inventory"
import Buisnesses from "./activities/Buisness"

export default function Activity(){
    useEffect(()=>{
        initFlowbite();
    },[])
    let [page,setPage] = useState("sales")
    return (
        <div class="p-4 rounded-lg border-gray-700 mt-14 text-gray-300">
            <div className="mb-8 font-semibold text-lg flex overflow-x-scroll sticky top-14 lg:top-16">
                {
                ["Sales","Users","Inventory","Business"].map((item,index)=>{
                    return (
                        <button key={index} onClick={()=>setPage(item.toLowerCase())} class={`px-4 py-2 rounded-lg mr-4 ${page === item.toLowerCase() ? "bg-gray-700" : ""}`}>{item}</button>
                    )
                })
                }
            </div>
            {page === "sales" && <Sales />}
            {page === "users" && <Users />}
            {page === "inventory" && <Inventory />}
            {page === "business" && <Buisnesses />}
        </div>
    )
}