/* eslint-disable react/prop-types */
import { useLocation, Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useSelector } from "react-redux";

const RequireAuth = (props) => {
  const location = useLocation();
  const { token, role } = useSelector((store) => store["auth"]);
  if (!token) {
    return <Navigate to={"/login"} replace />;
  }

  return (
    <div className="relative">
      <Header />
      <section className="pt-24 md:pt-16 lg:pt-24">
        {props[role] ? (
          <Outlet />
        ) : (
          <Navigate to="/unauthorized" state={{ from: location }} replace />
        )}
      </section>
      {/* <Footer /> */}
    </div>
  );
};
export default RequireAuth;
