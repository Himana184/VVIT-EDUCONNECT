/* eslint-disable react/prop-types */
import { jwtDecode } from "jwt-decode";
import Navbar from "../common/Navbar";
import StudentSidebar from "../common/StudentSidebar";
import { Navigate, Outlet, useLocation } from "react-router-dom";


const StudentLayout = (props) => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={"/auth/login"} replace />
  }
  const decodedData = jwtDecode(token);
  const userRole = decodedData.user.role;

  return (
    <>
      <Navbar />
      <div className="pt-20">
        <StudentSidebar />
        <main className="p-4 lg:ml-28">
          {props[userRole] ? (
            <Outlet />
          ) : (
            <Navigate to="/unauthorized" state={{ from: location }} />
          )}
        </main>
      </div>
    </>
  )
};

export default StudentLayout;