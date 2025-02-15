import { Route, Routes, useNavigate } from "react-router-dom"
import { AuthPage, TaskDisplayPage } from "./pages"
import Layout from "./layout/layout"
import { useEffect } from "react"
import { setNavigateFunction } from "./service"





function App() {
const navigate = useNavigate()

  useEffect(()=>{
    setNavigateFunction(navigate)
},[navigate])

  return (
    <>
     <Routes>
          <Route path="/" element={<Layout/>}>
              <Route index element={<TaskDisplayPage/>}/>
          </Route>
          <Route path="/auth" element={<AuthPage/>}/>
     </Routes>
    </>
  )
}

export default App
