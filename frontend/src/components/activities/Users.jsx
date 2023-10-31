import { useState, useEffect } from "react"
import {baseURL} from "../../data.json"

export default function Users(){
    let [users, setUsers] = useState([]);
    let [name, setName] = useState('');
    let [buisness, setBuisness] = useState('');
    let [buisnesses, setBuisnesses] = useState([]);
    let [role, setRole] = useState('');
    let [username, setUsername] = useState('');

    let add = (e) =>{
        e.preventDefault();
        fetch(`${baseURL}/addUser`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:name,
                buisness:buisness,
                role:parseInt(role),
                username:username
            })
        }).then(res=>res.json()).then(data=>{
            if(data.status === 'success'){
                alert('User added successfully')
                setUsers([...users,[name,role,username]])
                setName('')
                setRole('')
                setUsername('')
            }else if(data.status === 'error'){
                alert(data.response)
            }
        }).catch(err=>alert("server error"))
    }
    useEffect(()=>{
        fetch(`${baseURL}/buisnesses`).then(res=>res.json()).then(data=>{
            console.log(data)
            if(data.status === 'success'){
                setBuisnesses(data.response.buisnesses)
                setUsers(data.response.users)
            }else if(data.status === 'error'){
                console.log(data.response)
            }
        }).catch(err=>alert("server error"))
    },[])
    return(
        <div className="flex gap-4 flex-col md:flex-row justify-center">
            <div  className="w-full bg-gray-800 rounded py-4 px-4 overflow-x-scroll max-h-96 overflow-y-scroll">
                <h3 className="mb-6 font-semibold text-xl">User management</h3>
                <table className="w-full text-sm text-left text-gray-400 table-auto">
                    <thead className="text-xs text-gray-100 uppercase bg-blue-900 sticky top-0">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Buisness</th>
                            <th className="px-6 py-3">role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user,index)=>{
                                let roles = ['','Sales executive','Supervisor','Manager','Admin']
                                return(
                                    <tr className="bg-gray-800 border-b border-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">{user[0]}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{user[1]}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{roles[user[2]]}</td>
                                    </tr>
                                )
                            })
                        }
                        {
                            5-users.length>0?
                            [...Array(5-users.length)].map((item,index)=>{
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
            <div className="w-full">
                <div className="flex flex-col gap-4">
                    <h3 className="font-semibold">Add User</h3>
                    <input className="w-3/4 mx-auto bg-gray-900 py-2 px-2 rounded text-gray-100" type="text" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
                    <select className="w-3/4 mx-auto bg-gray-900 py-2 px-2 rounded text-gray-100" name="buisness" id="" value={buisness} onChange={e=>setBuisness(e.target.value)}>
                        <option value="">Select buisness</option>
                        {
                            buisnesses.map((buisness,index)=>{
                                console.log(`buisness !! ${buisness}`)
                                return(
                                    <option value={buisness[0]}>{buisness[0]}  {buisness[1]}</option>
                                )
                            })
                        }
                    </select>
                    <select className="w-3/4 mx-auto bg-gray-900 py-2 px-2 rounded text-gray-100" name="role" id="" value={role} onChange={e=>setRole(e.target.value)}>
                        <option value="">Select role</option>
                        <option value={4}>Admin</option>
                        <option value={3}>Manager</option>
                        <option value={2}>Supervisor</option>
                        <option value={1}>Sales executive</option>
                    </select>
                    <input className="w-3/4 mx-auto bg-gray-900 py-2 px-2 rounded text-gray-100" type="text" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
                    <button onClick={e=>add(e)} className="block bg-gray-900 w-1/2 mx-auto py-2 hover:scale-105">Add</button>
                </div>
                <div  className="flex flex-col gap-4">
                    <h3>Modify Role</h3>
                    <select className="w-3/4 bg-gray-900 py-2 px-2 rounded text-gray-100" name="user" id="">
                        <option value="">Select User</option>
                    </select>
                </div>
            </div>
        </div>
    )
}