import { useState, useContext, useEffect } from "react"
import { Context } from "../ContextProvider"

import Bur from "./display/Bar"
import Lyn from "./display/Line"
import Pie from "./display/Pie"
import Donut from "./display/Donut"
import Table from "./display/Table"
import Stats from "./display/Stats"

import {HotelData} from "../data.json"

function fetchData(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(HotelData);
        }, 1000);
    })
}

export default function Home(){
    let { HotelData, DisplayData } = useContext(Context);
    let [hotelData, setHotelData] = HotelData;
    let [search,setSearch] = useState('');

    let [choice, setChoice] = useState("line");

    useEffect(() => {
        fetchData().then((data) => {
            // console.log('data :: ',data)
            setHotelData(data)
        })
    }, []);

    return (
        <div class="p-4 rounded-lg border-gray-700 mt-14 lg:overflow-y-none">
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
                <div className="lg:col-span-2 flex items-center justify-center mb-4 rounded bg-gray-800 h-96">
                    {choice === "bar" ? <Bur /> : null}
                    {choice === "line" ? <Lyn /> : null}
                    {choice === "pie" ? <Pie /> : null}
                    {choice === "donut" ? <Donut /> : null}
                    {choice === "stats" ? <Stats /> : null}
                </div>
                <div className="grid grid-cols-2 lg:order-first gap-4 mb-4">
                {
                    [
                        <button onClick={e=>setChoice('line')} className="flex flex-col rounded bg-gray-800 hover:scale-105 hover:bg-gray-900">
                            <p className="text-gray-100 text-left font-semibold py-4 lg:py-8 lg:text-xl text-sm pl-4">Total sales</p>
                            <img className="block w-1/4 lg:w-1/6 mx-auto pb-4 lg:pb-0" src="/linechart.svg" alt="" />
                        </button>,
                        <button onClick={e=>setChoice('stats')} className="flex flex-col rounded bg-gray-800 hover:scale-105 hover:bg-gray-900">
                            <p className="text-gray-100 text-left font-semibold py-4 lg:py-8 lg:text-xl text-sm pl-4">Stats</p>
                            <p className="text-2xl block w-1/4 lg:w-1/6 mx-auto pb-4 lg:pb-0">O</p>
                        </button>,
                        <button onClick={e=>setChoice('bar')} className="flex flex-col rounded bg-gray-800 hover:scale-105 hover:bg-gray-900">
                            <p className="text-gray-100 text-left font-semibold py-4 lg:py-8 lg:text-xl text-sm pl-4">Variance</p>
                            <img className="block w-1/4 lg:w-1/6 mx-auto pb-4 lg:pb-0" src={`/barchart.svg`} alt="" />
                        </button>,
                        <button onClick={e=>setChoice('pie')} className="flex flex-col rounded bg-gray-800 hover:scale-105 hover:bg-gray-900">
                            <p className="text-gray-100 text-left font-semibold py-4 lg:py-8 lg:text-xl text-sm pl-4">% Performance</p>
                            <img className="block w-1/4 lg:w-1/6 mx-auto pb-4 lg:pb-0" src="/piechart.svg" alt="" />
                        </button>,
                        <button onClick={e=>setChoice('donut')} className="flex flex-col rounded bg-gray-800 hover:scale-105 hover:bg-gray-900">
                            <p className="text-gray-100 text-left font-semibold py-4 lg:py-8 lg:text-xl text-sm pl-4">Avg. Sales</p>
                            <img className="block w-1/4 lg:w-1/6 mx-auto pb-4 lg:pb-0" src="/donutchart.svg" alt="" />
                        </button>
                    ].map((item, index) => {
                        if(index!=['line','stats','bar','pie','donut'].indexOf(choice))  return item
                    })
                }
                </div>
            </div>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
                <div className="lg:col-span-2 flex rounded bg-gray-800 overflow-x-scroll overflow-y-scroll lg:h-2/3">
                    <Table/>
                </div>
                <div className="flex flex-col order-first lg:order-last  rounded bg-gray-800 text-gray-50 h-96 w-full md:w-2/3 lg:w-3/4 mx-auto relative px-2">
                    <div className="flex my-4">
                        <img className="w-4 mx-2" src="/filter.svg" alt="" />
                        <h3 className="text-xl font-semibold">Filter</h3>
                        <button className="mx-2 absolute right-1" onClick={e=>{document.getElementById('menu').toggleAttribute('hidden')}}><img className="w-8" src="/options.svg" alt="" /></button>
                    </div>
                    <input className="bg-slate-600 w-3/4 mx-auto rounded-full px-4 py-2" type="search" placeholder="search" value={search} onChange={e=>setSearch(e.target.value)}/>
                    <h4 className="my-4 text-right mx-2 text-2xl font-semibold">Hotels</h4>
                    <div className="divide-y font-semibold px-4">
                        <button className="block w-full text-left text-lg py-4 hover:bg-gray-900">Alpha <img className="w-6 inline float-right" src="/right.svg" alt="" /></button>
                        <button className="block w-full text-left text-lg py-4 hover:bg-gray-900">Highlands <img className="w-6 inline float-right" src="/right.svg" alt="" /></button>
                        <button className="block w-full text-left text-lg py-4 hover:bg-gray-900">Mara <img className="w-6 inline float-right" src="/right.svg" alt="" /></button>
                        <p></p>
                    </div>
                </div>
            </div>
        </div>
    )
}