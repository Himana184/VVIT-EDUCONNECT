import Navbar from "../common/Navbar";
import StudentSidebar from "../common/StudentSidebar";
import { Outlet } from "react-router-dom";

const StudentLayout = () => {
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