import { useState, useEffect, useContext } from "react"
import Calender from "../Calender"
import { Context } from "../../ContextProvider"
import {baseURL} from "../../data.json"

function Row({name,setSum, standing}){
    let [amount, setAmount] = useState();
    let [note, setNote] = useState('')
    let submit = (e) => {
        e.preventDefault();
        setSum(standing+parseInt(amount))
        fetch(`${baseURL}/setTarget`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                position:'',
                name:'',
                amount: amount,
                note:note
            })
        }).then(res=>res.json()).then(data=>{
            if(data.status === 'success'){
                setSum(standing+amount)
            }else if(data.status === 'error'){
                alert(data.response)
            }
        }).catch(err=>alert("server error"))
    }
    return(
        <tr className="bg-gray-800 border-b border-gray-700">
            <td className="px-6 py-3">{name}</td>
            <td className="px-6 py-3"><input value={amount} onChange={e=>setAmount(e.target.value)} className="w-3/4 md:w-fit bg-gray-200 text-black" type="number" /></td>
            <td className="px-6 py-3 min-h-96"><input value={note} onChange={e=>setNote(e.target.value)} className="w-3/4 md:w-fit bg-gray-200 text-black whitespace-normal h-12" type="text" /></td>
            <td className="md:px-6 py-2 md:py-0"><button className="py-2 px-4 w-full bg-gray-900 font-mono my-1 hover:uppercase" onClick={e=>submit(e)}>Set</button></td>
        </tr>
    )
}

export default function Target(){
    let { User } = useContext(Context);
    let [user, setUser] = User;

    let Datestamp = useState([(new Date()).getFullYear(),(new Date()).getMonth(),(new Date()).getDate()])
    let [buisnesses, setBuisnesses] = useState([])
    let [command, setCommand] = useState(0)
    let [sum, setSum] = useState(0)

    useEffect(()=>{
        fetch(`${baseURL}/getTarget`)
        .then(res=>res.json())
        .then(data=>{
            if(data.status === 'success'){
                setCommand(parseInt(data.response.command))
            }else if(data.status === 'error'){
                alert(data.response)
            }
        }).catch(err=>alert("server error"))
    },[])

    return(
        <div className="w-full flex flex-col lg:flex-row justify-evenly">
            <div  className="w-full lg:ml-8 bg-gray-800 rounded py-4 px-4 overflow-x-scroll">
                <div className="flex justify-between mb-6 font-semibold text-xl">
                    <h3 className="">Set target</h3>
                    <h3 className={`${sum-command>=0?'text-green-500':'text-red-500'}`}>{`${sum-command>=0?'+':'-'}${sum-command}`}.sh</h3>
                </div>
                <table className="w-full text-sm text-left text-gray-400 table-auto overflow-x-scroll">
                    <thead className="text-xs text-gray-100 uppercase bg-blue-900 sticky top-0">
                        <tr>
                            {user.role==4 && <th className="px-6 py-3">Hotel</th>}
                            {user.role==3 && <th className="px-6 py-3">Section</th>}
                            {user.role==2 && <th className="px-6 py-3">Sales executive</th>}
                            <th className="px-6 py-3">Target</th>
                            <th className="px-6 py-3">Note</th>
                            <th className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <Row name={'Esele'} setSum={setSum} standing={sum}/>
                        <Row name={'Merica'} setSum={setSum} standing={sum}/>
                        <Row name={'Newwe'} setSum={setSum} standing={sum}/>
                        {
                            buisnesses.map((item,index)=>{
                                return <Row name={item[0]} setSum={setSum} standing={sum}/>
                            })
                        }
                        {
                            10-buisnesses.length>0?
                            [...Array(10-buisnesses.length)].map((item,index)=>{
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
            <div className="w-full lg:mx-4">
                <Calender date={Datestamp}/>
            </div>
        </div>
    )
}