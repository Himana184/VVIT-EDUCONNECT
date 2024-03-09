//import AddJobDrive from "@/components/jobs/AddJobDrive"
import JobCard from "@/components/jobs/JobCard"
import { getJobDrives } from "@/redux/jobSlice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
const StudentJobs = () => {
  const { jobs } = useSelector((state) => state["job"]);
  const [data, setData] = useState(jobs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getJobDrives())
  }, [])
  return (
    <div>
     
      <div>
        <JobCard />
      </div>
    </div>
  )
}

export default StudentJobs