import Navbar from "../common/Navbar";
import AdminSidebar from "../common/AdminSidebar";
import { Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setRole } from "@/redux/authSlice";
import { useEffect } from "react";

const AdminLayout = () => {
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
        <AdminSidebar />
        <main className="p-4 lg:ml-28">
          <Outlet />
        </main>
      </div>
    </>
  )
};

export default AdminLayout;