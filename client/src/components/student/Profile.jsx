/* eslint-disable react-hooks/exhaustive-deps */
import { getStudentDetails } from "@/redux/studentSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { studentProfileSidebarItems } from "@/data/students";
import { ProfileSidebar } from "./ProfileSidebar";
import { RefreshCcw } from "lucide-react";

const Profile = () => {
  const { studentId } = useParams();
  const dispatch = useDispatch();
  const { student } = useSelector((state) => state["student"])

  useEffect(() => {
    const fetchStudentDetails = async () => {
      await dispatch(getStudentDetails({ id: studentId }));
    }

    fetchStudentDetails();
  }, [studentId])


  return (
    <div className="flex flex-col lg:flex-row gap-2">
      {/* Left div with image,name and sections tab */}
      <div className="lg:w-[20%] space-y-4">
        {/* Image div */}
        <div className="flex items-center justify-center">
          <Avatar className="h-48 w-48">
            <AvatarImage src={student?.image} alt={student?.name} className="h-48 w-48"></AvatarImage>
            <AvatarFallback>{student?.name?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
        {/* Details */}
        <Card className="shadow-none border-none">
          <CardHeader className="flex justify-center">
            <CardTitle className="text-center">{student?.name}</CardTitle>
            <CardDescription className="text-center">{student?.passoutYear} - {student?.branch} - {student?.section}</CardDescription>
          </CardHeader>
        </Card>
        {/* Sections Tab */}
        <ProfileSidebar items={studentProfileSidebarItems} />
      </div>
      <div className="lg:w-[80%]">
        <div className="flex justify-end cursor-pointer mb-2">
          <RefreshCcw onClick={() => dispatch(getStudentDetails({ id: studentId }))} />
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default Profile