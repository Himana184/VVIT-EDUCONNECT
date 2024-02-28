/* eslint-disable no-unused-vars */
import { Badge } from "@/components/ui/badge";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { DeleteIcon, Edit2Icon, Edit3Icon, Trash2Icon } from "lucide-react";
import DeleteDialog from "@/components/common/DeleteDialog";
import EditCertification from "@/components/certifications/EditCertification";
import { Switch } from "@/components/ui/switch";
import { deleteCourse } from "@/redux/courseSlice";
import { useDispatch } from "react-redux";


export const coursesData = [
  {
    courseName: "JavaScript Basics",
    coursePlatform: "Codecademy",
    student: { "_id": { "$oid": "65b75a58170348a2aca61fea" }, "name": "chandra", "rollNumber": "20bq1a05p2", "collegeMail": "20bq1a05p2@vvit.net", "personalMail": "gnanachandra2003@gmail.com", "password": "$2a$10$MhpoqrntiXMWzS/ozfFf9uKD4CCqweaV.g5wl4nY/Fee4ur1V9/kG", "contact": "7702663224", "branch": "CSE", "section": "D", "image": "https://storage.googleapis.com/filesharingapplication/gnanachandra_photo.jpg", "passoutYear": { "$numberInt": "2024" }, "isActive": true, "deviceTokens": [], "role": "student", "createdAt": { "$date": { "$numberLong": "1706515032991" } }, "updatedAt": { "$date": { "$numberLong": "1706515032991" } }, "__v": { "$numberInt": "0" } },
    startDate: "2023-05-10",
    completionStatus:"completed",
    tags: "Web Development, Programming, Bootcamp,Rust,Kubernetes",
    certificate: "https://www.codecademy.com/certificates/javascript-basics",
  },
  {
    courseName: "Python Fundamentals",
    coursePlatform: "Coursera",
    student: { "_id": { "$oid": "65b75a58170348a2aca61fea" }, "name": "chandra", "rollNumber": "20bq1a05p2", "collegeMail": "20bq1a05p2@vvit.net", "personalMail": "gnanachandra2003@gmail.com", "password": "$2a$10$MhpoqrntiXMWzS/ozfFf9uKD4CCqweaV.g5wl4nY/Fee4ur1V9/kG", "contact": "7702663224", "branch": "CSE", "section": "D", "image": "https://storage.googleapis.com/filesharingapplication/gnanachandra_photo.jpg", "passoutYear": { "$numberInt": "2024" }, "isActive": true, "deviceTokens": [], "role": "student", "createdAt": { "$date": { "$numberLong": "1706515032991" } }, "updatedAt": { "$date": { "$numberLong": "1706515032991" } }, "__v": { "$numberInt": "0" } },
    startDate: "2023-07-20",
    completionStatus:"completed",
    tags: "Web Development, Programming, Bootcamp,Rust,Kubernetes",
    certificate: "https://www.coursera.org/certificates/python-fundamentals",
  },
  {
    courseName: "Data Science Specialization",
    coursePlatform: "Udacity",
    student: { "_id": { "$oid": "65b75a58170348a2aca61fea" }, "name": "chandra", "rollNumber": "20bq1a05p2", "collegeMail": "20bq1a05p2@vvit.net", "personalMail": "gnanachandra2003@gmail.com", "password": "$2a$10$MhpoqrntiXMWzS/ozfFf9uKD4CCqweaV.g5wl4nY/Fee4ur1V9/kG", "contact": "7702663224", "branch": "CSE", "section": "D", "image": "https://storage.googleapis.com/filesharingapplication/gnanachandra_photo.jpg", "passoutYear": { "$numberInt": "2024" }, "isActive": true, "deviceTokens": [], "role": "student", "createdAt": { "$date": { "$numberLong": "1706515032991" } }, "updatedAt": { "$date": { "$numberLong": "1706515032991" } }, "__v": { "$numberInt": "0" } },
    startDate: "2023-09-15",
    completionStatus:"completed",
    tags: "Web Development, Programming, Bootcamp,Rust,Kubernetes",
    certificate: "https://www.udacity.com/course/data-science-nanodegree--nd025",
  },
  {
    courseName: "Web Development Bootcamp",
    coursePlatform: "FreeCodeCamp",
    student: { "_id": { "$oid": "65b75a58170348a2aca61fea" }, "name": "chandra", "rollNumber": "20bq1a05p2", "collegeMail": "20bq1a05p2@vvit.net", "personalMail": "gnanachandra2003@gmail.com", "password": "$2a$10$MhpoqrntiXMWzS/ozfFf9uKD4CCqweaV.g5wl4nY/Fee4ur1V9/kG", "contact": "7702663224", "branch": "CSE", "section": "D", "image": "https://storage.googleapis.com/filesharingapplication/gnanachandra_photo.jpg", "passoutYear": { "$numberInt": "2024" }, "isActive": true, "deviceTokens": [], "role": "student", "createdAt": { "$date": { "$numberLong": "1706515032991" } }, "updatedAt": { "$date": { "$numberLong": "1706515032991" } }, "__v": { "$numberInt": "0" } },
    startDate: "2023-11-28",
    completionStatus:"completed",
    tags: "Web Development, Programming, Bootcamp,Rust,Kubernetes",
    certificate: "https://www.freecodecamp.org/certification/yourusername/full-stack",
  },
];

export const courseTableColumns = [
    {
        header: "Course Name",
        accessorKey: "courseName",
    },

  {
    header: "Course Platform",
    cell: ({ row }) => {
      return (

        <img
          src={
            "https://cdn.iconscout.com/icon/free/png-256/free-google-160-189824.png"
          }
          alt={row.original.coursePlatform}
          className="h-10 w-10 rounded-full"
        />

      );
    },
  },
  {
    header: "Completion Status",
    accessorKey: "completionStatus",
  },
  {
    header: "Student name",
    cell: ({ row }) => {
      return (
        <p>{row.original.student.name}</p>
      )
    }
  },
  {
    header: "Roll No",
    cell: ({ row }) => {
      return (
        <p>{row.original.student.rollNumber}</p>
      )
    }
  },
  {
    header: "Tags",
    accessorKey: "tags",
    cell: ({ row }) => {
      return (
        <div className="flex flex-wrap gap-x-2 gap-y-1 justify-start ">
          {row.original.tags.split(",").map((item, index) => {
            return (
              <Badge key={index} variant={"outline"}>{item}</Badge>
            )
          })}
        </div>
      )
    }
  },
  {
    header: "Course Certificate",
    cell: ({ row }) => {
      return (
        <a href={row.original.certificate} target="_blank" rel="noreferrer">
          <Badge>View</Badge>
        </a>
      );
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex space-x-4">
          <Edit3Icon size={25} className="cursor-pointer" />
          <Trash2Icon size={25} className="cursor-pointer" />
        </div>
      )
    }
  },
  {
    header: "Delete",
    id: "DeleteAction",
    enableHiding: false,
    cell: ({ row }) => {
      const course = row.original;
      return (
        <div className="flex">
          <DeleteDialog
            type="course"
            dialogTitle={"Are you sure to delete course details"}
            data={course}
            dialogDescription={
              "This action is irreversible click delete to delete the details permanently"
            }
            handleDelete={deleteCourse}
          />
        </div>
      );
    },
  },
];
