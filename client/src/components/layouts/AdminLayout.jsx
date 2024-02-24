import Navbar from "../common/Navbar";
import AdminSidebar from "../common/AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
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