import TanstackTable from "@/components/table/TanstackTable"
import { coursesData, courseTableColumns } from "@/data/courses"
import AddCourse from "@/components/courses/AddCourse"
const StudentCourses = () => {
  return (
    <div>
        <div className="flex justify-end">
        <AddCourse />
        </div>
       <div>
        <TanstackTable tableData={coursesData} columns={courseTableColumns} />
       </div>
    </div>
  )
}

export default StudentCourses