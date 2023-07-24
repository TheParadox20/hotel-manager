import { createContext, useState } from "react";

export const Context = createContext();

export function ContextProvider({ children }) {
    let User = useState(null)
    let Filters = useState({start:'',end:'',depth:['Hotels']})
    let HotelData = useState([])
    let DisplayData = useState({table:{cols:[],rows:[[]]},chart:{},stats:{}})

    return (
        <Context.Provider value={{ User, Filters, HotelData, DisplayData }}>
            {children}
        </Context.Provider>
    )
}