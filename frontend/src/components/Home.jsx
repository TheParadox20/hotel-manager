import { useState } from "react"
import Filter from "./Filter"
import Bar from "./display/Bar"
import Line from "./display/Line"
import Pie from "./display/Pie"
import Donut from "./display/Donut"
import Table from "./display/Table"

export default function Home(){
    return (
        <div class="p-4 rounded-lg border-gray-700 mt-14">
            <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                <div className="md:col-span-2 flex items-center justify-center h-48 mb-4 rounded bg-gray-800">
                    <img className="w-1/6 text-gray-400" src="/linechart.svg" alt="" />
                </div>
                <div className="grid md:grid-cols-2 md:order-first grid-cols-4 gap-4 mb-4 overflow-x-scroll">
                    <div className="flex items-center justify-center rounded h-28 bg-gray-800">
                        <p className="text-2xl text-gray-400 dark:text-gray-500">O</p>
                    </div>
                    <div className="flex items-center justify-center rounded h-28 bg-gray-800">
                        <img className="w-1/6 text-gray-400" src="/barchart.svg" alt="" />
                    </div>
                    <div className="flex items-center justify-center rounded h-28 bg-gray-800">
                    <img className="w-1/6 text-gray-400" src="/piechart.svg" alt="" />
                    </div>
                    <div className="flex items-center justify-center rounded h-28 bg-gray-800">
                    <img className="w-1/6 text-gray-400" src="/donutchart.svg" alt="" />
                    </div>
                </div>
            </div>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                <div className="md:col-span-2 flex items-center justify-center h-48 mb-4 rounded bg-gray-800">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">T</p>
                </div>
                <div className="flex order-first md:order-last items-center justify-center h-48 mb-4 rounded bg-gray-800">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">F</p>
                </div>
            </div>
        </div>
    )
}