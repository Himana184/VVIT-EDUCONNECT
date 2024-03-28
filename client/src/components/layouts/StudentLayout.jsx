/* eslint-disable react/prop-types */
import Navbar from "../common/Navbar";
import StudentSidebar from "../common/StudentSidebar";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";


const StudentLayout = (props) => {
  const { token, role } = useSelector((state) => state["auth"]);
  ("Token : ", token)
  if (!token) {
    return <Navigate to={"/auth/login"} replace />;
  }

  return (
    <>
      <Navbar />
      <div className="pt-20">
        <StudentSidebar />
        <main className="p-4 lg:ml-28">
          {props[role] ? (
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