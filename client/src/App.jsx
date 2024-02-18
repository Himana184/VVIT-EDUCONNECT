import { BrowserRouter as Router, Routes, Route } from "react-router-dom"


import AdminLayout from "./components/layouts/AdminLayout"
const App = () => {
  return (
    <Router>
      <Routes>

        {/* Landing page which contains details about the project features */}
        {/* <Route path="/" element={<Landing />} /> */}

        {/* routes related to registeration and login of users */}
        <Route path="/auth">
          {/* <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route> */}
        </Route>

        {/* all routes of student */}
        <Route path="/student"></Route>

        {/* all routes of admin */}
        <Route path="/admin" element={<AdminLayout />}>
          
        </Route>

        {/* all routes of coordinator */}
        <Route path="/coordinator"></Route>

        {/* all routes of faculty */}
        <Route path="/faculty"></Route>
      </Routes>
    </Router>
  )
}

export default App