/* eslint-disable react/prop-types */
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { deleteJobDrive, handleOptInDrive, handleOptOutDrive } from "@/redux/jobSlice"
import { formatDate } from "@/utils/formatDate"
import { Banknote, Briefcase, CalendarSearch, MapPin, Trash2Icon } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
const BasicDetails = ({ job }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role, user } = useSelector((state) => state["auth"])

  const deleteDrive = async () => {
    const response = await dispatch(deleteJobDrive({ id: job._id }));
    if (response.meta.requestStatus === "fulfilled") {
      navigate(`/${role}/jobs`, { replace: true });
    }
  }

  return (
    <Card className="w-full flex flex-col justify-between">
      <CardHeader className="flex flex-row justify-between">
        <div className="space-y-2">
          <img src={job.companyLogo || "https://www.forgerock.com/sites/default/files/dam-assets/accenture-partner-tp-logo.png"}
            className="h-16 w-16 rounded-full border border-gray-200" />
          <CardTitle>{job?.companyName || "Company Name"}</CardTitle>
          <CardDescription>{job?.roles?.join(",") || "Hiring for roles"}</CardDescription>
        </div>
        {/* only for student opt in and status of application */}
        {
          role == "student" && <div className='flex flex-col space-y-3'>
            {
              console.log(job?.optedStudents.find(student => student._id === user._id))
            }
            {job?.optedStudents.find(student => student._id === user._id) ? (
              <Button onClick={() => dispatch(handleOptOutDrive({ id: job._id }))}>
                Opt out
              </Button>
            ) : (
              <Button onClick={() => dispatch(handleOptInDrive({ id: job._id }))}>
                Opt-in
              </Button>
            )}

          </div>
        }
        {/* Delete job drive only for admin */}
        {
          role === "admin" && <div>
            <Button variant="destructive" className="space-x-2 flex items-center justify-center" onDoubleClick={deleteDrive}>
              <Trash2Icon /><span>
                Delete
              </span>
            </Button>
          </div>
        }
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <MapPin size={20} className="text-primary" />
          <p>{job?.jobLocation || "Job Location"}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Briefcase size={20} className="text-primary" />
          <p className="flex-1">{job?.categories?.join(",") || "Job Category"}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Banknote size={20} className="text-primary" />
          <p className="text-lg font-medium"><span>&#8377;</span>{job?.salary || "Salary Range"} <span className="text-xs">LPA</span></p>
        </div>
        <div className="space-x-2">
          {
            job?.skills?.[0]?.split(",")?.map((skill, index) => {
              return (
                <Badge key={index} variant={"outline"}>{skill}</Badge>
              )
            })
          }
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <CalendarSearch size={20} className="text-primary" />
          <div>
            <p className="font-semibold">{formatDate(job?.lastDate) || "NA"}</p>
            <p className="text-xs font-medium">Last Date</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <CalendarSearch size={20} className="text-primary" />
          <div>
            <p className="font-semibold">{formatDate(job?.createdAt) || "NA"}</p>
            <p className="text-xs font-medium">Posted Date</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default BasicDetails