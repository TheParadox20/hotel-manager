import { useState, useEffect, useContext} from "react"
import { initFlowbite } from 'flowbite'
import Sales from "./activities/Sales"
import Lobby from "./activities/Lobby"
import Inventory from "./activities/Inventory"
import Buisness from "./activities/Buisness"
import { Context } from "../ContextProvider"

export default function Activity(){
    let { User } = useContext(Context);
    let [user, setUser] = User;
    useEffect(()=>{
        initFlowbite();
    },[])
    let menu;
    if (user.role<4) menu = ["Sales","Inventory"]
    else menu = ["Lobby","Business"]
    let [page,setPage] = useState(menu[0].toLowerCase())
    
    return (
        <>
        <div className="mb-24 md:mx-4 mt-4 text-gray-300 font-semibold text-lg flex overflow-x-scroll sticky top-16 bg-gray-700 before:px-0">
            {
            menu.map((item,index)=>{
                return (
                    <button key={index} onClick={()=>setPage(item.toLowerCase())} className={`px-4 py-2 border-gray-400 pr-8 ${page === item.toLowerCase() ? "bg-gradient-to-b from-gray-800 border-b-0 border-2 rounded-t-lg" : "border-b-2"}`}>{item}</button>
                )
            })
            }
            <button className="px-4 py-2 border-b-2 border-gray-400 pr-8"></button>
        </div>
        <div class="p-4 rounded-lg border-gray-700 mt-14 text-gray-300">
            {page === "sales" && <Sales />}
            {page === "lobby" && <Lobby />}
            {page === "inventory" && <Inventory />}
            {page === "business" && <Buisness />}
        </div>
        </>
    )
}