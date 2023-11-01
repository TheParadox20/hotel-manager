import { useState, useEffect, useContext } from "react"
import Calender from "../Calender"
import { getDaySuffix, getMonthName } from "../Calender"
import { Context } from "../../ContextProvider"
import {baseURL} from "../../data.json"

export default function Target(){
    let { User } = useContext(Context);
    let [user, setUser] = User;

    let Datestamp = useState([(new Date()).getFullYear(),(new Date()).getMonth(),(new Date()).getDate()])
    let [day, setDay] = useState('Tuesday, 2nd-October')
    let [buisnesses, setBuisnesses] = useState([])
    let [command, setCommand] = useState(0)
    let [sum, setSum] = useState(0)
    let [amount, setAmount] = useState();
    let [note, setNote] = useState('')
    let [owner, setOwner] = useState('')//who gets the target
    let [buisness, setBuisness] = useState('')//which buisness
    let [users, setUsers] = useState([])
    let [previous, setPrevious] = useState([])
    let [targets, setTargets] = useState({})

    let submit = (e) => {
        e.preventDefault();
        fetch(`${baseURL}/setTarget`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                position:buisness,
                name:owner,
                amount: amount,
                note:note,
                date:`${Datestamp[0][0]}-${getMonthName(Datestamp[0][1])}-${Datestamp[0][2]}`,
            })
        }).then(res=>res.json()).then(data=>{
            if(data.status === 'success'){
                setSum(parseInt(sum)+parseInt(amount))
                if (user.role === 4) setPrevious([...previous,[buisness,amount,note,`${Datestamp[0][0]}-${getMonthName(Datestamp[0][1])}-${Datestamp[0][2]}`]])
                setOwner('')
                setBuisness('')
                setAmount(0)
                setNote('')
            }else if(data.status === 'error'){
                alert(data.response)
            }
        }).catch(err=>alert("server error"))
    }

    useEffect(()=>{
        fetch(`${baseURL}/getTargets`)
        .then(res=>res.json())
        .then(data=>{
            if(data.status === 'success'){
                setPrevious(data.response.previous)
                setUsers(data.response.users)
                setTargets(data.response.targets)
                setBuisnesses(data.response.buisness)
                setCommand(data.response.targets[`${Datestamp[0][0]}-${getMonthName(Datestamp[0][1])}-${Datestamp[0][2]}`])
            }else if(data.status === 'error'){
                alert(data.response)
            }
        }).catch(err=>alert("server error"))
    },[])
    useEffect(()=>{
        let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
        let date = new Date(Datestamp[0][0],Datestamp[0][1],Datestamp[0][2])
        setDay(`${days[date.getDay()]}, ${date.getDate()}${getDaySuffix(date.getDate())}-${getMonthName([date.getMonth()])}`)
        setCommand(targets[`${Datestamp[0][0]}-${getMonthName(Datestamp[0][1])}-${Datestamp[0][2]}`]?targets[`${Datestamp[0][0]}-${getMonthName(Datestamp[0][1])}-${Datestamp[0][2]}`]:0)
    },[Datestamp[0]])

    return(
        <>
        <div className="w-full flex flex-col lg:flex-row justify-evenly">
            <div  className="w-full lg:ml-8 bg-gray-800 rounded py-4 px-4 overflow-x-scroll">
                <div className="flex flex-col md:flex-row justify-between mb-6 font-semibold text-xl">
                    <h3 className="">Set target  <span className="ml-2 text-md">({day})</span></h3>
                    {
                        user.role!=4 &&
                        <h3 className={`${sum-command>=0?'text-green-500':'text-red-500'}`}>{`${sum-command>=0?'+':''}${sum-command}`}.sh</h3>
                    }
                </div>
                <div className="w-full h-full justify-center items-center">
                    <form onSubmit={submit} className="flex flex-col justify-center items-center gap-4">
                        {
                            user.role>2 &&
                            <select className="w-3/4 bg-gray-900 py-2 px-2 rounded text-gray-100" name="buisness" id="" value={buisness} onChange={e=>setBuisness(e.target.value)}>
                                <option value="">Select {['Section','Buisness'][user.role-3]}</option>
                                {
                                    buisnesses.map((buisness,index)=>{
                                        return(
                                            <option value={buisness}>{buisness}</option>
                                        )
                                    })
                                }
                            </select>
                        }
                        <select className="w-3/4 bg-gray-900 py-2 px-2 rounded text-gray-100" name="users" id="" value={owner} onChange={e=>setOwner(e.target.value)}>
                            <option value="">Select user</option>
                            {
                                users.map((user,index)=>{
                                    return(
                                        <option value={user}>{user}</option>
                                    )
                                })
                            }
                        </select>
                        <input className="w-3/4 bg-gray-900 py-2 px-2 rounded text-gray-100" type="number" placeholder="Amount" onChange={(e)=>setAmount(e.target.value)} required/>
                        <input className="w-3/4 bg-gray-900 py-2 px-2 rounded text-gray-100 whitespace-wrap h-28" type="text" placeholder="Note" onChange={(e)=>setNote(e.target.value)} required/>
                        <button className="w-3/4 bg-blue-900 py-2 px-2 rounded text-gray-100 my-4" type="submit" onClick={e=>submit(e)}>Submit</button>
                    </form>
                </div>
            </div>
            <div className="w-full lg:mx-4 mt-4">
                <Calender date={Datestamp}/>
            </div>
        </div>
        <div className="max-w-full overflow-x-scroll max-h-96 overflow-y-scroll">
        <table className="lg:w-3/4 mx-auto mt-8 text-sm text-left text-gray-400 table-auto">
            <thead className="text-xs text-gray-100 uppercase bg-blue-900 sticky top-0">
                <tr>
                    {user.role==4 && <th className="px-6 py-3">Buisness</th>}
                    {user.role==3 && <th className="px-6 py-3">Buisness</th>}
                    {user.role==2 && <th className="px-6 py-3">Section</th>}
                    <th className="px-6 py-3">Target</th>
                    <th className="px-6 py-3">Note</th>
                    <th className="px-6 py-3">Date</th>
                </tr>
            </thead>
            <tbody>
                {
                    previous.map((row,index)=>{
                        return(
                            <tr className="bg-gray-800 border-b border-gray-700">
                                <td className="px-6 py-4 whitespace-nowrap">{row[0]}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{row[1]}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{row[2]}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{row[3]}</td>
                            </tr>
                        )
                    })
                }
                {
                    10-previous.length>0?
                    [...Array(10-previous.length)].map((item,index)=>{
                        return(
                            <tr className="bg-gray-800 border-b border-gray-700">
                                <td className="px-6 py-4 whitespace-nowrap"></td>
                                <td className="px-6 py-4 whitespace-nowrap"></td>
                                <td className="px-6 py-4 whitespace-nowrap"></td>
                                <td className="px-6 py-4 whitespace-nowrap"></td>
                            </tr>
                        )})
                    :null
                }
            </tbody>
        </table>
        </div>
        </>
    )
}