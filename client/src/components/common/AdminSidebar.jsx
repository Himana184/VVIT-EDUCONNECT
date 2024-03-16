// Example usage for the "student" role
import Sidebar from "./Sidebar";

const AdminSidebar = () => {
  const role = "admin";

  return (
    <div>
      {/* Other components or content for the student page */}
      <Sidebar show={true} role={role} />
    </div>
  );
};

export default AdminSidebar;
