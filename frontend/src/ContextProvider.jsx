import { createContext, useState } from "react";

export const Context = createContext();

export function ContextProvider({ children }) {
    let User = useState(null)
    let Filters = useState({start:'',end:'',depth:[]})
    let HotelData = useState([])

    return (
        <Context.Provider value={{ User, Filters, HotelData }}>
            {children}
        </Context.Provider>
    )
}