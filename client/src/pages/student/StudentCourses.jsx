import TanstackTable from "@/components/table/TanstackTable";
import { courseTableColumns } from "@/data/studentcourses";
import { getCourses } from "@/redux/courseSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCourse from "@/components/courses/AddCourse";

const StudentCourses = () => {
  const { courses } = useSelector((state) => state["course"]);
  console.log("courses : ", courses);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCourses());
  }, []);
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-end">
        <AddCourse />
      </div>
      <div>
        <TanstackTable tableData={courses} columns={courseTableColumns} />
      </div>
    </div>
  );
};

export default StudentCourses;
