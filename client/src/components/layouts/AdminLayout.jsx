/* eslint-disable react/prop-types */
import Navbar from "../common/Navbar";
import AdminSidebar from "../common/AdminSidebar";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminLayout = (props) => {
  const { token, role } = useSelector((state)=>state["auth"]);
  if (!token) {
    return <Navigate to={"/auth/login"} replace />;
  }
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <AdminSidebar />
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

export default AdminLayout;