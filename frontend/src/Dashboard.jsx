import { useState, useEffect, useContext } from "react"
import { initFlowbite } from 'flowbite'
import { Context } from "./ContextProvider"
import Home  from './components/Home'
import Settings from "./components/Settings"
import Activity from "./components/Activity"
import Download from "./components/Download"

export default function Dashboard(){
    let { User } = useContext(Context);
    let [user, setUser] = User;
    let [page, setPage] = useState('home')

    //if not logged in, redirect to login page via useEffect
    useEffect(()=>{
        initFlowbite();
    },[])
    let logout = (e) => {
        e.preventDefault()
        setUser(null);
    }
    
    return(
        <div>
            <nav class="fixed top-0 z-50 w-full bg-gray-800 border-gray-700">
            <div class="px-3 py-3 lg:px-5 lg:pl-3">
                <div class="flex items-center justify-between">
                <div class="flex items-center justify-start">
                    <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 text-sm rounded-lg sm:hidden  focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600">
                        <span class="sr-only">Open sidebar</span>
                        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                        </svg>
                    </button>
                    <a href="/" class="flex ml-2 md:mr-24">
                    <img src="/logo.svg" class="h-8 mr-3" alt="Logo" />
                    <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-gray-100">HotelHUB</span>
                    </a>
                </div>
                <div class="flex items-center">
                    <div class="flex items-center ml-3">
                        <div>
                        <button type="button" class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                            <span class="sr-only">Open user menu</span>
                            <img class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo"/>
                        </button>
                        </div>
                        <div class="z-50 hidden my-4 text-base list-none divide-y rounded shadow bg-gray-700 divide-gray-600" id="dropdown-user">
                        <div class="px-4 py-3" role="none">
                            <p class="text-sm  text-white" role="none">
                            {localStorage.getItem('username')}
                            </p>
                            <p class="text-sm font-medium truncate text-gray-300" role="none">
                            {localStorage.getItem('email')}
                            </p>
                        </div>
                        <ul class="py-1" role="none">
                            <li>
                            <button onClick={e=>setPage('home')} class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white" role="menuitem">Dashboard</button>
                            </li>
                            <li>
                            <button onClick={e=>setPage('settings')} class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white" role="menuitem">Settings</button>
                            </li>
                            <li>
                            <button onClick={e=>logout(e)} class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white" role="menuitem">Sign out</button>
                            </li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            </nav>

            <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full border-r sm:translate-x-0 bg-gray-800 border-gray-700" aria-label="Sidebar">
            <div class="h-full px-3 pb-4 overflow-y-auto bg-gray-800">
                <ul class="space-y-2 font-medium">
                    
                    <li onClick={e=>setPage('home')}>
                        <button href="#" class="flex items-center p-2  rounded-lg text-white hover:bg-gray-700">
                        <svg aria-hidden="true" class="w-6 h-6 transition duration-75 text-gray-400  group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                        <span class="ml-3">Dashboard</span>
                        </button>
                    </li>
                    <li onClick={e=>setPage('activity')}>
                        <button class="flex items-center p-2  rounded-lg text-white hover:bg-gray-700">
                        <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                        <span class="flex-1 ml-3 whitespace-nowrap">Activity</span>
                        </button>
                    </li>
                    <li onClick={e=>setPage('download')}>
                        <button class="flex items-center p-2  rounded-lg text-white hover:bg-gray-700">
                        <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                        <span class="flex-1 ml-3 whitespace-nowrap">Download</span>
                        </button>
                    </li>
                    <li onClick={e=>setPage('inbox')}>
                        <button class="flex items-center p-2  rounded-lg text-white hover:bg-gray-700">
                        <img className="w-6" src="/message.svg" alt="" />
                        <span class="flex-1 ml-3 whitespace-nowrap">Inbox</span>
                        </button>
                    </li>
                    <li onClick={e=>setPage('inbox')}>
                        <button class="flex items-center p-2  rounded-lg text-white hover:bg-gray-700">
                        <img className="w-6" src="/settings.svg" alt="" />
                        <span class="flex-1 ml-3 whitespace-nowrap">Settings</span>
                        </button>
                    </li>
                </ul>
            </div>
            </aside>

            {/* Start of main content */}

            <div class="sm:ml-64 bg-gray-700 h-screen overflow-y-scroll">
                {page === 'home' && <Home />}
                {page === 'settings' && <Settings />}
                {page === 'download' && <Download />}
                {page === 'activity' && <Activity />}
            </div>
        </div>
    )
}