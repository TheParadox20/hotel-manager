import { useContext, useState } from "react"
import { Context } from "../ContextProvider"

export default function Filter(){
    let { HotelData, Filters } = useContext(Context);
    let [hotelData, setHotelData] = HotelData;
    let [filter, setFilter] = Filters;
    let [search,setSearch] = useState('');

    console.log('filter :: ',filter);

    return(
        <>
        <div className="flex flex-col order-first lg:order-last  rounded bg-gray-800 text-gray-50 h-96 w-full md:w-2/3 lg:w-3/4 mx-auto relative px-2 overflow-y-scroll">
            <div className="flex my-4">
                <img className="w-4 mx-2" src="/filter.svg" alt="" />
                <h3 className="text-xl font-semibold">Filter</h3>
                <button className="mx-2 absolute right-1" onClick={e=>{document.getElementById('menu').toggleAttribute('hidden')}}><img className="w-8" src="/options.svg" alt="" /></button>
            </div>
            <input className="bg-slate-600 w-3/4 mx-auto rounded-full px-4 py-2 my-2" type="search" placeholder="search" value={search} onChange={e=>setSearch(e.target.value)}/>
            <div className="flex justify-between">
                {
                    filter.depth.length > 0 ? <button className="ml-4 w-6" onClick={e=>setFilter({...filter,depth:filter.depth.slice(0,-1)})}><img className="w-full" src="/back.svg"/></button> : null
                }
                <h4 className="w-full my-4 text-right mx-2 text-2xl font-semibold">
                    {
                        ['Hotel','Section','Supervisor','waitstuff'][filter.depth.length]
                    }
                </h4>
            </div>
            <div className="divide-y font-semibold px-4">
                {
                    [...new Set(hotelData.map(item => item[(filter.depth.length)]))].map((item, index) => {
                        if(item.toLowerCase().includes(search.toLowerCase())) return <button className="block w-full text-left text-lg py-4 hover:bg-gray-900" value={item} onClick={e=>setFilter({...filter,depth:[...filter.depth,e.target.value]})}>{item} <img className="w-6 inline float-right" src="/right.svg" alt="" /></button>
                    })
                }
                <p></p>
            </div>
        </div>
        </>
    )
}