import { useState } from "react"
import Table from "./display/Table"

export default function Download(){
    let [search,setSearch] = useState('');
    return(
        <div class="p-4 rounded-lg dark:border-gray-700 mt-14 text-gray-300">
            <div class="grid md:grid-rows-3 md:grid-flow-col gap-4 md:grid-cols-3 grid-cols-1">
                <div class="row-span-3 md:col-span-2 overflow-x-scroll order-last md:order-first"><Table/></div>
                <div class="bg-gray-800 py-8 px-2">
                    <img className="inline w-8" src="/download.svg" alt="" />
                    <button className="font-semibold text-xl bg-gray-900 px-4 py-2 float-right rounded-2xl">Download report</button>
                </div>
                <div class="md:row-span-2 bg-gray-800">
                    <div className="flex flex-col order-first md:order-last  rounded bg-gray-800 text-gray-50 h-96 w-full md:w-3/4 mx-auto relative px-2">
                        <div className="flex my-4">
                            <img className="w-4 mx-2" src="/filter.svg" alt="" />
                            <h3 className="text-xl font-semibold">Filter</h3>
                            <button className="mx-2 absolute right-1" onClick={e=>{document.getElementById('menu').toggleAttribute('hidden')}}><img className="w-8" src="/options.svg" alt="" /></button>
                        </div>
                        <input className="bg-slate-600 w-3/4 mx-auto rounded-full px-4 py-2" type="search" placeholder="search" value={search} onChange={e=>setSearch(e.target.value)}/>
                        <h4 className="my-4 text-right mx-2 text-2xl font-semibold">Hotels</h4>
                        <div className="divide-y font-semibold">
                            <button className="block w-full text-left text-lg py-2 hover:bg-gray-900">Alpha <img className="w-6 inline float-right" src="/right.svg" alt="" /></button>
                            <button className="block w-full text-left text-lg py-2 hover:bg-gray-900">Highlands <img className="w-6 inline float-right" src="/right.svg" alt="" /></button>
                            <button className="block w-full text-left text-lg py-2 hover:bg-gray-900">Mara <img className="w-6 inline float-right" src="/right.svg" alt="" /></button>
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}