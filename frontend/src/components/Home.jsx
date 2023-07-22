import { useState, useContext, useEffect } from "react"
import { Context } from "../ContextProvider"

import Filter from "./Filter"
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

    let [choice, setChoice] = useState("line");

    useEffect(() => {
        fetchData().then((data) => {
            // console.log('data :: ',data)
            setHotelData(data)
        })
    }, []);

    return (
        <div class="p-4 rounded-lg border-gray-700 mt-14">
            <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                <div className="md:col-span-2 flex items-center justify-center mb-4 rounded bg-gray-800 h-96">
                    {choice === "bar" ? <Bur /> : null}
                    {choice === "line" ? <Lyn /> : null}
                    {choice === "pie" ? <Pie /> : null}
                    {choice === "donut" ? <Donut /> : null}
                    {choice === "stats" ? <Stats /> : null}
                </div>
                <div className="grid grid-cols-2 md:order-first gap-4 mb-4">
                {
                    [
                        <button onClick={e=>setChoice('line')} className="flex flex-col rounded bg-gray-800 hover:scale-105 hover:bg-gray-900">
                            <p className="text-gray-100 text-left font-semibold py-4 md:py-8 md:text-xl text-sm pl-4">Total sales</p>
                            <img className="block w-1/4 md:w-1/6 mx-auto pb-4 md:pb-0" src="/linechart.svg" alt="" />
                        </button>,
                        <button onClick={e=>setChoice('stats')} className="flex flex-col rounded bg-gray-800 hover:scale-105 hover:bg-gray-900">
                            <p className="text-gray-100 text-left font-semibold py-4 md:py-8 md:text-xl text-sm pl-4">Stats</p>
                            <p className="text-2xl block w-1/4 md:w-1/6 mx-auto pb-4 md:pb-0">O</p>
                        </button>,
                        <button onClick={e=>setChoice('bar')} className="flex flex-col rounded bg-gray-800 hover:scale-105 hover:bg-gray-900">
                            <p className="text-gray-100 text-left font-semibold py-4 md:py-8 md:text-xl text-sm pl-4">Variance</p>
                            <img className="block w-1/4 md:w-1/6 mx-auto pb-4 md:pb-0" src={`/barchart.svg`} alt="" />
                        </button>,
                        <button onClick={e=>setChoice('pie')} className="flex flex-col rounded bg-gray-800 hover:scale-105 hover:bg-gray-900">
                            <p className="text-gray-100 text-left font-semibold py-4 md:py-8 md:text-xl text-sm pl-4">% Performance</p>
                            <img className="block w-1/4 md:w-1/6 mx-auto pb-4 md:pb-0" src="/piechart.svg" alt="" />
                        </button>,
                        <button onClick={e=>setChoice('donut')} className="flex flex-col rounded bg-gray-800 hover:scale-105 hover:bg-gray-900">
                            <p className="text-gray-100 text-left font-semibold py-4 md:py-8 md:text-xl text-sm pl-4">Avg. Sales</p>
                            <img className="block w-1/4 md:w-1/6 mx-auto pb-4 md:pb-0" src="/donutchart.svg" alt="" />
                        </button>
                    ].map((item, index) => {
                        if(index!=['line','stats','bar','pie','donut'].indexOf(choice))  return item
                    })
                }
                </div>
            </div>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                <div className="md:col-span-2 flex mb-4 rounded bg-gray-800 overflow-x-scroll">
                    <Table/>
                </div>
                <div className="flex flex-col order-first md:order-last items-center justify-center mb-4 rounded bg-gray-800 text-gray-50">
                    <Filter />
                </div>
            </div>
        </div>
    )
}