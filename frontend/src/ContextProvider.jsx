import { createContext, useState } from "react";
import { getWeeksOfMonth } from "./components/Calender";

export const Context = createContext();

export function ContextProvider({ children }) {
    //epoch is the date of the first sunday of the first week of current month
    let User = useState({
        username:"sam",
        email:"sam@me.com",
        role:4
    })
    let Filters = useState({start:0,end:0,depth:[],epoch:(getWeeksOfMonth(new Date().getFullYear(),new Date().getMonth())[0].epoch),descending:true,sort:0,inventory:false,range:"week"})
    let HotelData = useState([])

    return (
        <Context.Provider value={{ User, Filters, HotelData }}>
            {children}
        </Context.Provider>
    )
}