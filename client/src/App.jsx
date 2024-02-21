import { BrowserRouter as Router, Routes, Route } from "react-router-dom"


import AdminLayout from "./components/layouts/AdminLayout"
import Students from "./pages/admin/Students"
import Coordinators from "./pages/admin/Coordinators"
import Jobs from "./pages/admin/Jobs"
import JobDetail from "./components/jobs/JobDetail"
import Certifications from "./pages/admin/Certifications"
import Announcements from "./pages/admin/Announcements"
import Internships from "./pages/admin/Internships"
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
          <Route path="students" index element={<Students />}></Route>
          <Route path="coordinators" index element={<Coordinators />}></Route>
          <Route path="jobs" element={<Jobs />} >
          </Route>
          <Route path="certifications" element={<Certifications />}></Route>
          <Route path="detail" element={<JobDetail />} />
          <Route path="announcements" element={<Announcements />}></Route>
          <Route path="internships" element={<Internships />}></Route>
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