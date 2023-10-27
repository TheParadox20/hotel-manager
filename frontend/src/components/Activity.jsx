import { useState, useEffect, useContext} from "react"
import { initFlowbite } from 'flowbite'
import Sales from "./activities/Sales"
import Lobby from "./activities/Lobby"
import Inventory from "./activities/Inventory"
import Buisness from "./activities/Buisness"
import Logs from "./activities/Logs"
import { Context } from "../ContextProvider"

export default function Activity({page}){
    console.log(':: INTO ::',page)
    let { User } = useContext(Context);
    let [user, setUser] = User;
    useEffect(()=>{
        initFlowbite();
    },[])
    let menu;
    if (user.role<4) menu = ["Sales","Inventory"]
    else menu = ["Lobby","Business"]
    if (user.role===6) menu.push("Logs")
    
    return (
        <>
        <div class="p-4 rounded-lg border-gray-700 mt-14 text-gray-300">
            {page === "salesEntry" && <Sales />}
            {page === "lobby" && <Lobby />}
            {page === "inventoryEntry" && <Inventory />}
            {page === "buisness" && <Buisness />}
            {page === "logs" && <Logs />}
        </div>
        </>
    )
}