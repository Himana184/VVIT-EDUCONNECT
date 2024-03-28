/* eslint-disable react/prop-types */
import Navbar from "../common/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import CoordinatorSidebar from "../common/CoordinatorSidebar";
import { useSelector } from "react-redux";

const CoordinatorLayout = (props) => {
  const { token, role } = useSelector((state) => state["auth"]);
  if (!token) {
    return <Navigate to={"/auth/login"} replace />;
  }
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <CoordinatorSidebar />
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

export default CoordinatorLayout;