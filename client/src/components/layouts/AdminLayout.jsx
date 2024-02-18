import Navbar from "../common/Navbar";
import Sidebar from "../common/Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <Sidebar />
        <main className="p-4 lg:ml-24">
          <Outlet />
        </main>
      </div>
    </>
  )
};

export default AdminLayout;