import { useState, useEffect, useContext } from "react"
import {baseURL} from "../../data.json"
import { Context } from "../../ContextProvider"

export function Add({Control, Others, Role}){
    let [type,setType] = useState('Hotel')
    let [name,setName] = useState('')

    let submit = (e) => {
        e.preventDefault();
        fetch(`${baseURL}/addbuisness`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                type:type,
                name:name
            })
        }).then(res=>res.json()).then(data=>{
            if(data.status === 'success'){
                alert(`${Role==4?'Buisness':'Section'} added successfully`)
                Others[1]([...Others[0],[type,name]])
                Control[1](false)
            }else if(data.status === 'error'){
                alert(data.response)
            }
        }).catch(err=>alert("server error"))
    }
    return(
        <>
        <form className="mx-4 lg:w-1/2 lg:mx-auto">
            {
                Role==4 &&
                <div>
                    <label htmlFor="type" className="block text-lg font-bold leading-6 my-6">
                        Type
                    </label>
                    <div className="mt-2">
                        <input
                        id="type"
                        name="type"
                        type="text"
                        value={type}
                        onChange={(e)=>setType(e.target.value)}
                        className="pl-2 text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-0 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
            }
            <div>
                <label htmlFor="name" className="block text-lg font-bold leading-6 my-6">
                    Name
                </label>
                <div className="mt-2">
                    <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    className="pl-2 text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-0 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
        </form>
        <div className="flex justify-around mt-8 font-semibold">
            <button className="w-full hover:scale-y-105 hover:bg-gray-900 h-full py-4" onClick={e=>Control[1](false)}>Cancel</button>
            <button className="w-full hover:scale-y-105 hover:bg-gray-900 h-full py-4" onClick={e=>submit(e)}>Add</button>
        </div>
        </>
    )
}

export default function Buisness({Role}){
    let ControlAdd = useState(false)
    let [users, setUsers] = useState([])
    let Buisnesses = useState([])

    let { User } = useContext(Context);
    let [user, setUser] = User;

    let roles = ['','Sales executive','accountant','clerk','supervisor','manager','Admin'];

    useEffect(()=>{
        fetch(`${baseURL}/buisnesses`).then(res=>res.json()).then(data=>{
            console.log(data)
            if(data.status === 'success'){
                Buisnesses[1](data.response.buisnesses)
                setUsers(data.response.users)
            }else if(data.status === 'error'){
                console.log(data.response)
            }
        }).catch(err=>alert("server error"))
    },[])
    return(
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className=" bg-gray-800 rounded py-4">
                {
                    ControlAdd[0]
                    ?
                    <Add Control={ControlAdd} Others={Buisnesses} Role={user.role} />
                    :
                    <div className="flex gap-4 items-center justify-center flex-col" onClick={e=>ControlAdd[1](true)}>
                        <button className="w-max"><img className="w-48 block" src="/add.svg"/></button>
                        <p className="text-2xl my-4 font-semibold">Add {user.role==4?"Buisness":"Section"}</p>
                    </div>
                }
            </div>
            <div  className=" bg-gray-800 rounded py-4 px-4 overflow-x-scroll">
                <table className="w-full text-sm text-left text-gray-400 table-auto">
                    <thead className="text-xs text-gray-100 uppercase bg-blue-900 sticky top-0">
                        <tr>
                            {
                                user.role==4
                                ? //if admin
                                <>
                                <th className="px-6 py-3">Buisness type</th>
                                <th className="px-6 py-3">Name</th>
                                </>
                                :
                                <>
                                <th className="px-6 py-3">Section</th>
                                <th className="px-6 py-3">Buisness</th>
                                </>
                            }
                            <th className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Buisnesses[0].map((item,index)=>{
                                return(
                                    <tr className="bg-gray-800 border-b border-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">{item[1]}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item[0]}</td>
                                        <td className="md:px-6 py-2 md:py-0"><button className="py-2 w-full bg-gray-900 font-mono my-1 hover:uppercase"><img className="inline" src="/x.svg" alt="" /> remove</button></td>
                                    </tr>
                                )
                            })
                        }
                        {
                            7-Buisnesses[0].length>0?
                            [...Array(7-Buisnesses[0].length)].map((item,index)=>{
                                return(
                                    <tr className="bg-gray-800 border-b border-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap"></td>
                                    </tr>
                                )})
                            :null
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}