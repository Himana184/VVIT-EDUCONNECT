// Example usage for the "student" role
import React from "react";
import Sidebar from "./Sidebar";

const StudentSidebar = () => {
  const role = "student";

  return (
    <div>
      {/* Other components or content for the student page */}
      <Sidebar show={true} role={role} />
    </div>
  );
};

export default StudentSidebar;
