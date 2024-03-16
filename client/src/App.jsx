import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from 'react-hot-toast';
import AdminLayout from "./components/layouts/AdminLayout"
import StudentLayout from "./components/layouts/StudentLayout"
import CoordinatorLayout from "./components/layouts/CoordinatorLayout";
import Students from "./pages/admin/Students"
import Coordinators from "./pages/admin/Coordinators"
import Jobs from "./pages/Jobs"
import JobDetail from "./components/jobs/JobDetail"
import Certifications from "./pages/Certifications"
import Announcements from "./pages/Announcements";
import Internships from "./pages/Internships"
import LoginPage from "./pages/auth/LoginPage"
import RegisterPage from "./pages/auth/RegisterPage"
import StudentQueries from "./pages/student/StudentQueries"
import Courses from "./pages/Courses";
import Dashboard from "./pages/admin/Dashboard";
import AddAnnouncement from "./components/announcements/AddAnnouncement";
import EditAnnouncement from "./components/announcements/EditAnnouncement";
import AddJobDrive from "./components/jobs/AddJobDrive";
import Profile from "./components/student/Profile";
import StudentInternships from "./pages/student/StudentInternships";
import StudentCertifications from "./pages/student/StudentCertifications";
import StudentCourses from "./pages/student/StudentCourses";
import StudentDetails from "./components/student/StudentDetails";
import StudentOptedJobs from "./pages/student/StudentOptedJobs";
import Landing from "./pages/Landing";
import Unauthorized from "./pages/Unauthorized";
import { useEffect } from "react";
import { requestPermission } from "./utils/requestPermission";
import Notifications from "./pages/admin/Notifications";

const App = () => {
  useEffect(() => {
    requestPermission()
  }, [])
  return (
    <Router>
      <Routes>

        {/* Landing page which contains details about the project features */}
        <Route path="/" element={<Landing />} />

        {/* routes related to registeration and login of users */}
        <Route path="/auth">
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="register" element={<RegisterPage />}></Route>
        </Route>

        {/* all routes of student */}
        <Route path="/student" element={<StudentLayout student={true} />}>
          <Route path="announcements" element={<Announcements />}></Route>
          <Route path="jobs" element={<Jobs />}></Route>
          <Route path="jobs/:jobId" element={<JobDetail />}></Route>
          <Route path="internships" element={<Internships />}></Route>
          <Route path="courses" element={<Courses />}></Route>
          <Route path="queries" element={<StudentQueries />}></Route>
          <Route path="certifications" element={<Certifications />}></Route>

        </Route>

        {/* all routes of admin */}
        <Route path="/admin" element={<AdminLayout admin={true} />}>
          <Route index element={<Dashboard />} />
          <Route path="students" index element={<Students />}></Route>
          <Route path="students/:studentId" element={<Profile />}>
            <Route index element={<StudentDetails />}></Route>
            <Route path="certifications" element={<StudentCertifications />}></Route>
            <Route path="internships" element={<StudentInternships />}></Route>
            <Route path="courses" element={<StudentCourses />}></Route>
            <Route path="internships" element={<Internships />}></Route>
            <Route path="optedJobs" element={<StudentOptedJobs />}></Route>
          </Route>
          <Route path="notifications" element={<Notifications />} />
          <Route path="coordinators" index element={<Coordinators />}></Route>
          <Route path="jobs" element={<Jobs />} ></Route>
          <Route path="jobs/:jobId" element={<JobDetail />}></Route>
          <Route path="certifications" element={<Certifications />}></Route>
          <Route path="detail" element={<JobDetail />} />
          <Route path="announcements" element={<Announcements />}></Route>
          <Route path="internships" element={<Internships />}></Route>
          <Route path="courses" element={<Courses />}></Route>
          <Route path="addAnnouncement" element={<AddAnnouncement />} />
          <Route path="editAnnouncement" element={<EditAnnouncement />} />
          <Route path="addJobDrive" element={<AddJobDrive />} />
        </Route>

        {/* all routes of coordinator */}
        <Route path="/coordinator" element={<CoordinatorLayout coordinator={true} />}>
          <Route path="students" index element={<Students />}></Route>
          <Route path="students/:studentId" element={<Profile />}>
            <Route index element={<StudentDetails />}></Route>
            <Route path="certifications" element={<StudentCertifications />}></Route>
            <Route path="internships" element={<StudentInternships />}></Route>
            <Route path="courses" element={<StudentCourses />}></Route>
            <Route path="internships" element={<Internships />}></Route>
            <Route path="optedJobs" element={<StudentOptedJobs />}></Route>
          </Route>
          <Route path="coordinators" index element={<Coordinators />}></Route>
          <Route path="jobs" element={<Jobs />} ></Route>
          <Route path="jobs/:jobId" element={<JobDetail />}></Route>
          <Route path="certifications" element={<Certifications />}></Route>
          <Route path="detail" element={<JobDetail />} />
          <Route path="announcements" element={<Announcements />}></Route>
          <Route path="internships" element={<Internships />}></Route>
          <Route path="courses" element={<Courses />}></Route>
          <Route path="addAnnouncement" element={<AddAnnouncement />} />
          <Route path="editAnnouncement" element={<EditAnnouncement />} />
          <Route path="addJobDrive" element={<AddJobDrive />} />

        </Route>

        {/* all routes of faculty */}
        <Route path="/faculty"></Route>
        <Route path="/unauthorized" element={<Unauthorized />}></Route>
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App