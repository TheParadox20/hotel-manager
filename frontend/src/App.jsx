import { useContext,useEffect,useState } from "react"
import Login from "./Login"
import Dashboard from "./Dashboard"
import { Context } from "./ContextProvider"
import {baseURL} from "./data.json"

export default function App() {
  let { User } = useContext(Context);
  let [user, setUser] = User;
  let [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    if(localStorage.getItem('user')==null && !(user)){
      setAuthorized(false)
    }else if(user){
      localStorage.setItem('user',JSON.stringify(user))
      fetch(`${baseURL}/session`).then(res => res.json()).then(data => {
        if(data.status === 'success'){
          setUser({username:data.response.username,role:data.response.role,email:data.response.email})
        }else if(data.status === 'error'){
          localStorage.removeItem('user')
          setUser(null)
          alert(data.response);
          setAuthorized(false);
        }
      }).catch(err => {
        console.log(err)
      })
      setAuthorized(true)
    }
  }, [])
  useEffect(() => {
    setAuthorized(user ? true : false)
  }, [user])

  return (
    <>
      {
        true ? <Dashboard /> : <Login />
      }
    </>
  )
}