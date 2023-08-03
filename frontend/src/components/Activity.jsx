import { useState, useEffect } from "react"
import { initFlowbite } from 'flowbite'

import Calender from "./Calender"

export function Input({variable, level}){
    let [item, setIem] = variable;
    return(
        <>
        <div className="bg-gray-800 py-4 px-6 pb-8">
            <p className="text-2xl text-right font-semibold">{level}</p>
            
            {
                !(level.includes('amount'))?
                <button id="dropdownSearchButton" data-dropdown-toggle={level} data-dropdown-placement="bottom" className="my-4 text-white text-lg focus:ring-4 focus:outline-none font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center bg-gray-800 hover:bg-gray-700 focus:ring-gray-800 w-full" type="button">
                    Select {level}
                    <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                    </svg>
                </button>
                :
                <div className="py-4"></div>
            }

            <div id={level} className="z-10 hidden rounded-lg shadow w-60 bg-gray-900">
                <div className="p-3">
                <label for="input-group-search" className="sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                    </div>
                    <input type="text" id="input-group-search" className="block w-full p-2 pl-10 text-sm border rounded-lg bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500" placeholder={`Search ${level}`}/>
                </div>
                </div>
                <ul className="px-3 pb-3 overflow-y-auto text-sm text-gray-200" aria-labelledby="dropdownSearchButton">
                    <li>
                        <button className="w-full text-left py-2 ml-2 text-sm font-medium rounded text-gray-300 hover:bg-gray-600" value={'Donald duck'} onClick={e=>setIem(e.target.value)}>Donald duck</button>
                    </li>
                    <li>
                        <button className="w-full text-left py-2 ml-2 text-sm font-medium rounded text-gray-300 hover:bg-gray-600" value={'Samson Me'} onClick={e=>setIem(e.target.value)}>Samson Me</button>
                    </li>
                </ul>
            </div>

            <input className="w-full py-2 px-1 rounded-md bg-gray-300 text-black" type={level.includes('amount')?'number':'text'} name="" id="" placeholder={level} value={item} onChange={e=>setIem(e.target.value)} />

        </div>
        </>
    )
}

export function Data(){// data entry component
    let Hotels = useState('')
    let Sections = useState('')
    let Supervisor = useState('')
    let Waitstuff = useState('')
    let Target = useState('')
    let Actuals = useState('')
    let Datestamp = useState([(new Date()).getFullYear(),(new Date()).getMonth(),(new Date()).getDate()])

    let submit = (e) => {
        e.preventDefault()
    }
    return(
        <div className="w-full flex flex-col lg:flex-row justify-evenly">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-8 w-full lg:ml-8">
                <Input variable={Hotels} level='Hotel'/>
                <Input variable={Sections} level='Section'/>
                <Input variable={Supervisor} level='Supervisor'/>
                <Input variable={Waitstuff} level='Waitstuff'/>
                <Input variable={Target} level='Target amount'/>
                <Input variable={Actuals} level='Actual amount'/>
                <button className="md:col-span-2 flex lg:w-1/2 w-full mx-auto justify-center rounded-md bg-blue-800 px-3 py-2 text-xl font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={e=>submit(e)}>Submit</button>   
            </div>
            <div className="w-full lg:mx-4">
                <Calender date={Datestamp}/>
            </div>
        </div>
    )
}

export default function Activity(){
    useEffect(()=>{
        initFlowbite();
    },[])
    return (
        <div class="p-4 rounded-lg border-gray-700 mt-14 text-gray-300">
            <div className="text-3xl font-bold my-4">Data Entry</div>
            <Data/>
        </div>
    )
}