import Login from "./Login"
import Dashboard from "./Dashboard"

export default function App() {
  return (
    <>
      {
        true ? <Dashboard /> : <Login />
      }
    </>
  )
}