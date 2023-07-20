import { useState } from "react"
import Filter from "./Filter"
import Bur from "./display/Bar"
import Lyn from "./display/Line"
import Pie from "./display/Pie"
import Donut from "./display/Donut"
import Table from "./display/Table"
import Stats from "./display/Stats"

export default function Home(){
    let [choice, setChoice] = useState("line");

    return (
        <div class="p-4 rounded-lg border-gray-700 mt-14">
            <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                <div className="md:col-span-2 flex items-center justify-center mb-4 rounded bg-gray-800">
                    {choice === "bar" ? <Bur /> : null}
                    {choice === "line" ? <Lyn /> : null}
                    {choice === "pie" ? <Pie /> : null}
                    {choice === "donut" ? <Donut /> : null}
                    {choice === "stats" ? <Stats /> : null}
                </div>
                <div className="grid md:grid-cols-2 md:order-first grid-cols-4 gap-4 mb-4 overflow-x-scroll">
                {
                    [
                        <button onClick={e=>setChoice('line')} className="flex items-center justify-center rounded bg-gray-800">
                            <p className="text-white">Total sales</p>
                            <img className="w-1/6 text-gray-400" src="/linechart.svg" alt="" />
                        </button>,
                        <button onClick={e=>setChoice('stats')} className="flex items-center justify-center rounded bg-gray-800">
                            <p className="text-white">Stats</p>
                            <p className="text-2xl text-gray-400 dark:text-gray-500">O</p>
                        </button>,
                        <button onClick={e=>setChoice('bar')} className="flex items-center justify-center rounded bg-gray-800">
                            <p className="text-white">Variance</p>
                            <img className="w-1/6 text-gray-400" src={`/barchart.svg`} alt="" />
                        </button>,
                        <button onClick={e=>setChoice('pie')} className="flex items-center justify-center rounded bg-gray-800">
                            <p className="text-white">% Performance</p>
                            <img className="w-1/6 text-gray-400" src="/piechart.svg" alt="" />
                        </button>,
                        <button onClick={e=>setChoice('donut')} className="flex items-center justify-center rounded bg-gray-800">
                            <img className="w-1/6 text-gray-400" src="/donutchart.svg" alt="" />
                        </button>
                    ].map((item, index) => {
                        if(index!=['line','stats','bar','pie','donut'].indexOf(choice))  return item
                    })
                }
                </div>
            </div>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                <div className="md:col-span-2 flex items-center justify-center h-48 mb-4 rounded bg-gray-800 overflow-x-scroll">
                    <Table/>
                </div>
                <div className="flex order-first md:order-last items-center justify-center h-48 mb-4 rounded bg-gray-800">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">F</p>
                </div>
            </div>
        </div>
    )
}