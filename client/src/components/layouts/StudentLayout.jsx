import { jwtDecode } from "jwt-decode";
import Navbar from "../common/Navbar";
import StudentSidebar from "../common/StudentSidebar";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setRole } from "@/redux/authSlice";

const StudentLayout = () => {
  const token = localStorage.getItem("token");
  const decodedData = jwtDecode(token);
  const userRole = decodedData.user.role;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setRole({ role: userRole }));
  }, [])
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <StudentSidebar />
        <main className="p-4 lg:ml-28">
          <Outlet />
        </main>
      </div>
    </>
  )
};

export default StudentLayout;