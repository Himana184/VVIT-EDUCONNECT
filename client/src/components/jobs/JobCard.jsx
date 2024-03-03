/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Banknote, Briefcase, CalendarSearch, MapPin } from "lucide-react";
import { Badge } from "../ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { formatDate } from "@/utils/formatDate";
import { useSelector } from "react-redux";

const JobCard = ({ job }) => {
  const { user, role } = useSelector((state) => state["auth"])
  return (
    <Card className="max-w-sm">
      <CardHeader className="flex flex-row justify-between">
        <div className="space-y-2">
          <img src="https://www.forgerock.com/sites/default/files/dam-assets/accenture-partner-tp-logo.png"
            className="h-16 w-16 rounded-full border border-gray-200" />
          <CardTitle>{job?.companyName || "Accenture"}</CardTitle>
          <CardDescription>{job?.roles?.join(",") || "Associate Software Engineer, AASE"}</CardDescription>
        </div>
        {
          role == "admin" &&
          (
            job.optedStudents.includes(user._id) ? <div>
              <Badge variant={'secondary'} className={"text-white"}>{"Applied"}</Badge>
            </div> : <div>
              <Badge>{"Not Applied"}</Badge>
            </div>
          )
        }
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <MapPin size={20} className="text-primary" />
          <p>{job?.jobLocation || "Pan India"}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Briefcase size={20} className="text-primary" />
          <p className="flex-1">{job?.category?.join(",") || "Internship, Full Time, Internship + Full Time"}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Banknote size={20} className="text-primary" />
          <p className="text-lg font-medium"><span>&#8377;</span>{job?.salary || "4,00,000 to 8,00,000"} <span className="text-xs">LPA</span></p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="block w-full font-medium text-lg">Skills</p>
            <div className="flex flex-wrap gap-2">
              {
                job.skills["0"].split(",").map((skill, index) => {
                  return (
                    <Badge key={index} variant={"outline"}>{skill}</Badge>
                  )
                })
              }
            </div>
          </div>
          <div className="space-y-2">
            <p className="block w-full font-medium text-lg">Branches</p>
            <div className="flex flex-wrap gap-2">
              {
                job.eligibleBranches["0"].split(",").map((skill, index) => {
                  return (
                    <Badge key={index} variant={"outline"}>{skill}</Badge>
                  )
                })
              }
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <CalendarSearch size={20} className="text-primary" />
          <div>
            <p className="font-semibold">{formatDate(job?.lastDate)}</p>
            <p className="text-xs font-medium">Last Date</p>
          </div>
        </div>
        <Link to={"/admin/detail"}>
          <Button>
            View More
          </Button></Link>
      </CardFooter>
    </Card>
  )
}

export default JobCard