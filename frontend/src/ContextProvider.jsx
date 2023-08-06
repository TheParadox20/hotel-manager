import { createContext, useState } from "react";

export const Context = createContext();

export function ContextProvider({ children }) {
    let User = useState(null)
    let Filters = useState({start:0,end:0,depth:[],epoch:'20230601'})
    let HotelData = useState([])

    return (
        <Context.Provider value={{ User, Filters, HotelData }}>
            {children}
        </Context.Provider>
    )
}