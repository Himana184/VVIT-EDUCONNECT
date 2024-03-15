import Navbar from "../common/Navbar";
import CoordinatorSidebar from "../common/CoordinatorSidebar";
import { Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setRole } from "@/redux/authSlice";
import { useEffect } from "react";

const CoordinatorLayout = () => {
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
        <CoordinatorSidebar />
        <main className="p-4 lg:ml-24">
          <Outlet />
        </main>
      </div>
    </>
  )
};

export default CoordinatorLayout;