import AddJobDrive from "@/components/jobs/AddJobDrive"
import JobCard from "@/components/jobs/JobCard"

const Jobs = () => {
  return (
    <div>
      <div className="flex justify-end">
        <AddJobDrive />
      </div>
      <div>
        <JobCard />
      </div>
    </div>
  )
}

export default Jobs