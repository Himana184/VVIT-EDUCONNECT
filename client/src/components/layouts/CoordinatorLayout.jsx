/* eslint-disable react/prop-types */
import { jwtDecode } from "jwt-decode";
import Navbar from "../common/Navbar";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import CoordinatorSidebar from "../common/CoordinatorSidebar";

const CoordinatorLayout = (props) => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  if (!token) {
    return <Navigate to={"/auth/login"} replace />
  }
  const decodedData = jwtDecode(token);
  const userRole = decodedData.user.role;
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <CoordinatorSidebar />
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

export default CoordinatorLayout;