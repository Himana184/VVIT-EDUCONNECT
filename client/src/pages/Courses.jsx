import AddCourse from "@/components/courses/AddCourse";
import TanstackTable from "@/components/table/TanstackTable";
import { adminCourseTableColumns, studentCourseTableColumns } from "@/data/courses";
import { getCourses } from "@/redux/courseSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Courses = () => {
  const { courses } = useSelector((state) => state["course"]);
  const { role } = useSelector((state) => state["auth"])
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCourses());
  }, []);
  return (
    <div className="flex flex-col space-y-6">
      {
        role == "student" &&
        <div className="flex justify-end">
          <AddCourse />
        </div>
      }
      <div>
        <TanstackTable tableData={courses || []} columns={role == "student" ? studentCourseTableColumns : adminCourseTableColumns} />
      </div>
    </div>
  );
};

export default Courses;
