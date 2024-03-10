import TanstackTable from "@/components/table/TanstackTable";
import { profileCourseColumns } from "@/data/courses";
import { getCourses } from "@/redux/courseSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const StudentCourses = () => {
  const {student} = useSelector((state)=>state["student"]);
  const courses = student.courses;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCourses());
  }, []);
  return (
    <div className="flex flex-col space-y-6">
      <div>
        <TanstackTable tableData={courses || []} columns={profileCourseColumns}/>
      </div>
    </div>
  );
};

export default StudentCourses;
