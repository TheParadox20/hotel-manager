import { createContext, useState } from "react";

export const Context = createContext();

export function ContextProvider({ children }) {
    //epoch is the date of the first sunday of the first week of current month
    let User = useState({
        username:"sam",
        buisness:"Merica",
        role:4
    })
    let Filters = useState({start:0,end:0,depth:[],descending:true,sort:0,inventory:false,range:"day"})
    let HotelData = useState([])
    let InventoryData = useState([])
    let DisplayData = useState([])

    return (
        <Context.Provider value={{ User, Filters, HotelData, InventoryData, DisplayData }}>
            {children}
        </Context.Provider>
    )
}