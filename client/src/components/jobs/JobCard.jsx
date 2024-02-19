import { Banknote, Briefcase, CalendarSearch, MapPin } from "lucide-react";
import { Badge } from "../ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineWork } from "react-icons/md";
import { Button } from "../ui/button";

const JobCard = ({ job }) => {

  return (
    <Card className="max-w-sm">
      <CardHeader className="flex flex-row justify-between">
        <div className="space-y-2">
          <img src="https://www.forgerock.com/sites/default/files/dam-assets/accenture-partner-tp-logo.png"
            className="h-16 w-16 rounded-full border border-gray-200" />
          <CardTitle>{job?.companyName || "Accenture"}</CardTitle>
          <CardDescription>{job?.roles?.join(",") || "Associate Software Engineer, AASE"}</CardDescription>
        </div>
        <div>
          <Badge variant={'secondary'} className={"text-white"}>{job?.appliedStatus || "Not Applied"}</Badge>
        </div>
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
        <div className="space-x-2">
          {
            ["MERN", "GCP", "Linux", "AWS", "DEVOPS"].map((skill, index) => {
              return (
                <Badge key={index}>{skill}</Badge>
              )
            })
          }
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <CalendarSearch size={20} className="text-primary" />
          <div>
            <p className="font-semibold">{job?.lastDate || "29-02-2024"}</p>
            <p className="text-xs font-medium">Last Date</p>
          </div>
        </div>
        <Button>
          View More
        </Button>
      </CardFooter>
    </Card>
  )
}

export default JobCard