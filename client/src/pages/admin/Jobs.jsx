import JobCard from "@/components/jobs/JobCard"
import { Button } from "@/components/ui/button"
import { getJobDrives } from "@/redux/jobSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Jobs = () => {
  const dispatch = useDispatch();
  const { jobs } = useSelector((state) => state["job"]);
  useEffect(() => {
    dispatch(getJobDrives())
  }, [])
  return (
    <div className="space-y-4">
      <Link to="/admin/addJobDrive">
        <div className="flex justify-end">
          <Button>
            Add Job Drive
          </Button>
        </div>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {
          jobs?.map((job, index) => {
            return (
              <JobCard job={job} key={index} />
            )
          })
        }

      </div>
    </div>
  )
}

export default Jobs