import Login from "./Login"
import Dashboard from "./Dashboard"

function App() {
  return (
    <>
      {
        false ? <Dashboard /> : <Login />
      }
    </>
  )
}

export default App
