import { useContext, useEffect, useState } from "react";
import { Context } from "../ContextProvider";

export default function Filter(){
    let { HotelData, DisplayData, Filters } = useContext(Context);
    let [hotelData, setHotelData] = HotelData;
    let [displayData, setDisplayData] = DisplayData;
    let [filters, setFilters] = Filters;
    let [search, setSearch] = useState("");

    let CreateTable = ()=>{
        displayData.table.cols = ['Hotel','Actuals','Target','Variance'];
        displayData.table.rows = [['Hotel','Actuals','Target','Variance']];
        setDisplayData(displayData);
    }
    
    let analytics = ()=>{}
    let filter = (e)=>{
        e.preventDefault();
        filters.depth=filters.depth.push(e.target.value);
        setFilters(filters)
    }
    useEffect(() => {
        // console.log('filter :: ',filters);
        CreateTable();
    }, [filters]);

    let core = null;

    return(
        <>
        <h3>Filter</h3>
        <input type="search" placeholder="search" value={search} onChange={e=>setSearch(e.target.value)}/>
        <div>Hotels</div>
        {
            filters.depth.map((key)=>{
                hotelData[key]?
                Object.keys(hotelData[key]).map((item)=>(<button>{item}</button>))
                :<h1>Fuck</h1>
            })
        }
        </>
    )
}