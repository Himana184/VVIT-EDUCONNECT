
import TanstackTable from "@/components/table/TanstackTable"
import { courseTableColumns } from "@/data/courses"
import { getCourses } from "@/redux/courseSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const Courses = () => {
  const {courses} = useSelector((state)=>state["course"]);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getCourses())
  },[])
  return (
    <div className="flex flex-col space-y-6">
      
      <div>
        <TanstackTable tableData={courses} columns={courseTableColumns} />
      </div>
    </div>
  )
}

export default Courses