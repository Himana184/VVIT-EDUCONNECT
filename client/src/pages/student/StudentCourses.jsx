import TanstackTable from "@/components/table/TanstackTable";
import { profileCourseColumns } from "@/data/courses";
import { useSelector } from "react-redux";

const StudentCourses = () => {
  const { student } = useSelector((state) => state["student"]);
  const courses = student.courses;

  return (
    <div className="flex flex-col space-y-6">
      <div>
        <TanstackTable tableData={courses || []} columns={profileCourseColumns} />
      </div>
    </div>
  );
};

export default StudentCourses;
