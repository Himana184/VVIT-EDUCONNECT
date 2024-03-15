import JobCard from "@/components/jobs/JobCard"
import { Button } from "@/components/ui/button"
import { getJobDrives } from "@/redux/jobSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Jobs = () => {
  const dispatch = useDispatch();
  const { user, role } = useSelector((state) => state["auth"])
  const { jobs } = useSelector((state) => state["job"]);
  console.log(jobs)
  useEffect(() => {
    dispatch(getJobDrives())
  }, [])
  return (
    <div className="space-y-4">
      {
        role == "admin" && <Link to="/admin/addJobDrive">
          <div className="flex justify-end">
            <Button>
              Add Job Drive
            </Button>
          </div>
        </Link>
      }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {
          jobs?.map((job, index) => {
            return (
              <JobCard job={job} key={index} />
            )
          })
        }
        {
          jobs?.length == 0 && <p>No Job Drives</p>
        }
      </div>
    </div>
  )
}

export default Jobs