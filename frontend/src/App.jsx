import { useContext } from "react"
import Login from "./Login"
import Dashboard from "./Dashboard"
import { Context } from "./ContextProvider"

export default function App() {
  let { User } = useContext(Context);
  let [user, setUser] = User;
  return (
    <>
      {
        true ? <Dashboard /> : <Login />
      }
    </>
  )
}