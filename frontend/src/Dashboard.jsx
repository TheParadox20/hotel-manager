import { useState, useEffect, useContext } from "react"
import { initFlowbite } from 'flowbite'
import { Context } from "./ContextProvider"
import Home  from './components/Home'
import Settings from "./components/Settings"
import Activity from "./components/Activity"
import Download from "./components/Download"
import Inbox from "./components/Inbox"
import {baseURL} from "./data.json"

export default function Dashboard(){
    let { User, HotelData, Filters, InventoryData, DisplayData } = useContext(Context);
    let [hotelData, setHotelData] = HotelData;
    let [inventory, setInventory] = InventoryData;
    let [display, setDisplay] = DisplayData;
    let [filter, setFilter] = Filters;
    let [user, setUser] = User;
    let [page, setPage] = useState('home')
    let [active, setActive] = useState('sales')

    let rangeFilter=()=>{
        let startDate = new Date(filter.start[0], filter.start[1], filter.start[2]);
        let endDate = new Date(filter.end[0], filter.end[1], filter.end[2]);
        if (!filter.inventory && hotelData.length!=0){
            return hotelData.filter(row => {
                const date = new Date(row[row.length - 1]);
                return date >= startDate && date <= endDate;
            });
        }
        if (filter.inventory && inventory.length!=0){
            return inventory.filter(row => {
                const date = new Date(row[row.length - 1]);
                return date >= startDate && date <= endDate;
            });
        }
        return []
    }

    //if not logged in, redirect to login page via useEffect
    useEffect(()=>{
        initFlowbite();
        fetch(`${baseURL}/getsales`).then(res => res.json()).then(data => {
            setHotelData(data.sales)
            setDisplay(data.sales)
            //then fetch inventory
            fetch(`${baseURL}/getinventory`).then(res => res.json()).then(data => {
                setInventory(data.response)
            }).catch(err => alert("server error, can't fetch inventory data"))
        }).catch(err => alert("server error, can't fetch sales data"))
    },[])
    useEffect(() => {
        if(filter.inventory){
            console.log('fetching inventory')
            setDisplay(inventory)
        }else{
            console.log('fetching sales')
            setDisplay(hotelData)
        }
    }, [filter.inventory]);
    useEffect(()=>{
        setDisplay([...rangeFilter()])
    },[filter.start, filter.end])

    let logout = (e) => {
        e.preventDefault()
        fetch(`${baseURL}/logout`).then(res => res.json()).then(data => {
            console.log(data)
            if(data.status=="success"){
                localStorage.removeItem('user')
                setUser(null);
                location.reload();
            }
        }).catch(err => alert("server error"))
    }
    let toggle = (e) => {
        e.preventDefault()
        let drawer = document.getElementById('logo-sidebar')
        if(drawer.classList.contains('transform-none')) drawer.classList.replace('transform-none','-translate-x-full')
    }
    
    return(
        <div className="whitespace-nowrap">
            <nav className="fixed top-0 z-50 w-full bg-gray-800 border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                <div className="flex items-center justify-start">
                    <button id="sidebar-control" data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm rounded-lg sm:hidden  focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600">
                        <span className="sr-only">Open sidebar</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                        </svg>
                    </button>
                    <a href="/" className="flex ml-2 md:mr-24">
                    <img src="/logo.svg" className="h-8 mr-3" alt="Logo" />
                    <span className="self-center text-xl font-semibold sm:text-2xl  text-gray-100">HotelHUB</span>
                    </a>
                </div>
                <div className="flex items-center">
                    <div className="flex items-center ml-3">
                        <div>
                        <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                            <span className="sr-only">Open user menu</span>
                            <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo"/>
                        </button>
                        </div>
                        <div className="z-50 hidden my-4 text-base list-none divide-y rounded shadow bg-gray-700 divide-gray-600" id="dropdown-user">
                        <div className="px-4 py-3" role="none">
                            <p className="text-sm  text-white" role="none">
                            {user.username}
                            </p>
                            <p className="text-sm  text-white" role="none">
                            {user.buisness}
                            </p>
                            <p className="mt-2 text-sm font-medium truncate text-gray-300" role="none">
                            {['Sales Executive','Supervisor','Manager','Admin'][user.role-1]}
                            </p>
                        </div>
                        <ul className="py-1" role="none">
                            <li >
                            <button onClick={e=>setPage('home')} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white" role="menuitem">Dashboard</button>
                            </li>
                            <li >
                            <button onClick={e=>setPage('settings')} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white" role="menuitem">Settings</button>
                            </li>
                            <li >
                            <button onClick={e=>logout(e)} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white" role="menuitem">Sign out</button>
                            </li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            </nav>

            <aside onClick={e=>toggle(e)} id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full border-r sm:translate-x-0 bg-gray-800 border-gray-700" aria-label="Sidebar">
            <div className="h-full px-3 pb-4 overflow-y-auto bg-gray-800">
                <ul className="space-y-2 font-medium">
                    <div onClick={e=>setPage('home')}>
                        <li>
                            <button className="flex items-center p-2  rounded-lg text-white">
                            <svg aria-hidden="true" className="w-6 h-6 transition duration-75 text-gray-400  group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                            <span className="ml-3 uppercase text-sm font-semibold">Dashboard</span>
                            </button>
                        </li>
                        <div className="ml-8 text-gray-50">
                            <button className={`block my-2 hover:bg-gray-700 w-full py-1 text-left pl-2 ${(!filter.inventory && page=='home')?'bg-gray-700':''}`} onClick={e=>setFilter({...filter, inventory:false})}>
                                <img src="/sales.svg" className="w-6 h-6 transition duration-75 text-gray-400  group-hover:text-white inline" alt="" />
                                <span className="ml-3">Sales</span>
                            </button>
                            {
                                (!filter.inventory&&page=='home'&&false) &&
                                <div className="ml-12">
                                    <button onClick={e=>setFilter({...filter,range:"day"})} className={`block my-1 hover:bg-gray-700 w-full py-1 text-left pl-2 ${filter.range=='day'&&page=='home'?'bg-gray-700':''}`}><img src="/date.svg" className="inline mr-2" alt="" />Daily</button>
                                    <button onClick={e=>setFilter({...filter,range:"week"})} className={`block my-1 hover:bg-gray-700 w-full py-1 text-left pl-2 ${filter.range=='week'&&page=='home'?'bg-gray-700':''}`}><img src="/date.svg" className="inline mr-2" alt="" />Weekly</button>
                                    <button onClick={e=>setFilter({...filter,range:"month"})} className={`block my-1 hover:bg-gray-700 w-full py-1 text-left pl-2 ${filter.range=='month'&&page=='home'?'bg-gray-700':''}`}><img src="/date.svg" className="inline mr-2" alt="" />Monthly</button>
                                </div>
                            }
                            <button className={`block my-2 hover:bg-gray-700 w-full py-1 text-left pl-2 ${(filter.inventory && page=='home')?'bg-gray-700':''}`} onClick={e=>setFilter({...filter, inventory:true})}>
                                <img src="/inventory.svg" className="inline w-6 h-6 transition duration-75 text-gray-400  group-hover:text-white" alt="" />
                                <span className="ml-3">Inventory</span>
                            </button>
                        </div>
                    </div>
                    {
                        user.role > 1 &&
                        <div onClick={e=>setPage('activity')}>
                            <li onClick={e=>setPage('activity')}>
                                <button className="flex items-center p-2  rounded-lg text-white">
                                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                                <span className="flex-1 ml-3  uppercase text-sm font-semibold">Activity</span>
                                </button>
                            </li>
                            <div className="ml-8 text-gray-50">
                                <button className={`block my-2 hover:bg-gray-700 w-full py-1 text-left pl-2 ${(active=='salesEntry' && page=='activity')?'bg-gray-700':''}`} onClick={e=>setActive("salesEntry")}>Sales Entry</button>
                                <button className={`block my-2 hover:bg-gray-700 w-full py-1 text-left pl-2 ${(active=='inventoryEntry' && page=='activity')?'bg-gray-700':''}`} onClick={e=>setActive("inventoryEntry")}>Inventory Entry</button>
                                <button className={`block my-2 hover:bg-gray-700 w-full py-1 text-left pl-2 ${(active=='lobby' && page=='activity')?'bg-gray-700':''}`} onClick={e=>setActive("lobby")}>Lobby</button>
                                <button className={`block my-2 hover:bg-gray-700 w-full py-1 text-left pl-2 ${(active=='buisness' && page=='activity')?'bg-gray-700':''}`} onClick={e=>setActive("buisness")}>Buisness Management</button>
                                <button className={`block my-2 hover:bg-gray-700 w-full py-1 text-left pl-2 ${(active=='users' && page=='activity')?'bg-gray-700':''}`} onClick={e=>setActive("users")}>User Management</button>
                                <button className={`block my-2 hover:bg-gray-700 w-full py-1 text-left pl-2 ${(active=='target' && page=='activity')?'bg-gray-700':''}`} onClick={e=>setActive("target")}>Set Targets</button>
                                <button className={`block my-2 hover:bg-gray-700 w-full py-1 text-left pl-2 ${(active=='logs' && page=='activity')?'bg-gray-700':''}`} onClick={e=>setActive("logs")}>Logs</button>
                            </div>
                        </div>
                    }
                    <div onClick={e=>setPage('inbox')}>
                        <li>
                            <button className="flex items-center p-2  rounded-lg text-white">
                            <img className="w-6" src="/message.svg" alt="" />
                            <span className="flex-1 ml-3  uppercase text-sm font-semibold">Inbox</span>
                            </button>
                        </li>
                        <div className="ml-8 text-gray-50">
                            <button onClick={e=>setActive('reports')} className={`block my-2 hover:bg-gray-700 w-full py-1 text-left pl-2 ${(active=='reports' && page=='inbox')?'bg-gray-700':''}`}>Reports</button>
                            <button onClick={e=>setActive('suggestions')} className={`block my-2 hover:bg-gray-700 w-full py-1 text-left pl-2 ${(active=='suggestions' && page=='inbox')?'bg-gray-700':''}`}>Suggestions</button>
                            <button onClick={e=>setActive('notifications')} className={`block my-2 hover:bg-gray-700 w-full py-1 text-left pl-2 ${(active=='notifications' && page=='inbox')?'bg-gray-700':''}`}>Notifications</button>
                        </div>
                    </div>
                    <div onClick={e=>setPage('download')}>
                        <div>
                            <div className="flex items-center p-2  rounded-lg text-white">
                            <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                            <span className="flex-1 ml-3  uppercase text-sm font-semibold">Download</span>
                            </div>
                        </div>
                        <div className="ml-8 text-gray-50">
                            <button className={`block my-2 hover:bg-gray-700 w-full py-1 text-left pl-2 ${(!filter.inventory && page=='download')?'bg-gray-700':''}`} onClick={e=>{setActive("salesDownload");setFilter({...filter,inventory:false})}}>Sales Report</button>
                            <button className={`block my-2 hover:bg-gray-700 w-full py-1 text-left pl-2 ${(filter.inventory && page=='download')?'bg-gray-700':''}`} onClick={e=>{setActive("inventoryDownload");setFilter({...filter,inventory:true})}}>Inventory Report</button>
                        </div>
                    </div>
                    <li onClick={e=>setPage('settings')}>
                        <button className="w-full block text-left p-3  rounded-lg text-white hover:bg-gray-700">
                        <img className="w-6 inline" src="/settings.svg" alt="" />
                        <span className="ml-3  uppercase text-sm font-semibold">Settings</span>
                        </button>
                    </li>
                </ul>
            </div>
            </aside>

            {/* Start of main content */}

            <div onClick={e=>toggle(e)} className="sm:ml-64 bg-gray-700 h-screen overflow-y-scroll">
                {page === 'home' && <Home />}
                {page === 'settings' && <Settings />}
                {page === 'download' && <Download />}
                {page === 'activity' && <Activity page={active} />}
                {page === 'inbox' && <Inbox page={active} />}
            </div>
        </div>
    )
}