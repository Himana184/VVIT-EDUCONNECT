/* eslint-disable react/prop-types */
import { Calendar, CalendarCheck } from "lucide-react"
import { Badge } from "../ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { CloudArrowDownIcon } from "@heroicons/react/24/outline"
import { formatDate } from "@/utils/formatDate"

const InternshipCard = ({ internship }) => {
  return (
    <Card className="max-w-full">
      <CardHeader className="flex items-center justify-between flex-row">
        <div>
          <CardTitle>
            {internship?.companyName || "Accenture"}
          </CardTitle>
          <CardDescription>
            {internship?.role || "Industry X Intern"}
          </CardDescription>
        </div>
        <div className="flex space-x-2">
          {
            internship?.verificationStatus == "rejected" && <Badge className={"bg-red-500 hover:bg-red-600"}>Rejected</Badge>
          }{
            internship?.verificationStatus == "pending" && <Badge className={"bg-yellow-500 hover:bg-yellow-600"}>Pending</Badge>
          }{
            internship?.verificationStatus == "verified" && <Badge className={"bg-green-500 hover:bg-green-600"}>Verified</Badge>
          }
          {/* <Badge className={"bg-green-500 hover:bg-green-600"}>{internship?.verificationStatus || "Verified"}</Badge> */}
          <Badge variant={"outline"}>{internship?.internshipType || "on-site"}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <p>{internship?.student?.name || "V. Gnana Chandra"}</p>
          <p>{internship?.student?.rollNumber || "20BQ1A05P2"} - {internship?.student?.passoutYear || 2024} - {internship?.student?.branch || "CSE"}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <CalendarCheck /> <p>{formatDate(internship?.startDate) || "27-02-2024"}</p>
          </div>
          <div className="flex items-center space-x-2">
            <CalendarCheck /> <p>{formatDate(internship?.endDate) || "27-06-2024"}</p>
          </div>
        </div>
        <div className="space-x-2">
          {
            ["MERN", "AWS", "DEVOPS"].map((item, index) => {
              return (
                <Badge key={index} variant={"outline"}>{item}</Badge>
              )
            })
          }
        </div>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <a href={internship?.offerLetter} target="_blank" rel="noreferrer">
          <Button variant="outline" className="flex space-x-2 items-center border-primary">
            <CloudArrowDownIcon className="h-7 w-7" />
            <p>Offer letter</p>
          </Button>
        </a>
        <a href={internship?.completionCertificate} target="_blank" rel="noreferrer">
          <Button variant="outline" className="flex space-x-2 items-center border-primary">
            <CloudArrowDownIcon className="h-7 w-7" />
            <p>Certificate</p>
          </Button>
        </a>
      </CardFooter>
    </Card>
  )
}

export default InternshipCard