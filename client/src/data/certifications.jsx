/* eslint-disable no-unused-vars */
import { Badge } from "@/components/ui/badge";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { DeleteIcon, Edit2Icon, Edit3Icon, Trash2Icon } from "lucide-react";

export const certificationsData = [
  {
    name: "JavaScript Basics",
    issuer: "Codecademy",
    certificateId: "CC123456",
    student: { "_id": { "$oid": "65b75a58170348a2aca61fea" }, "name": "chandra", "rollNumber": "20bq1a05p2", "collegeMail": "20bq1a05p2@vvit.net", "personalMail": "gnanachandra2003@gmail.com", "password": "$2a$10$MhpoqrntiXMWzS/ozfFf9uKD4CCqweaV.g5wl4nY/Fee4ur1V9/kG", "contact": "7702663224", "branch": "CSE", "section": "D", "image": "https://storage.googleapis.com/filesharingapplication/gnanachandra_photo.jpg", "passoutYear": { "$numberInt": "2024" }, "isActive": true, "deviceTokens": [], "role": "student", "createdAt": { "$date": { "$numberLong": "1706515032991" } }, "updatedAt": { "$date": { "$numberLong": "1706515032991" } }, "__v": { "$numberInt": "0" } },
    issueDate: "2023-05-10",
    expiryDate: "2025-05-10",
    branch: "MECH",
    tags: "Web Development,Javascript,Programming, Bootcamp",
    link: "https://www.codecademy.com/certificates/javascript-basics",
  },
  {
    name: "Python Fundamentals",
    issuer: "Coursera",
    certificateId: "CRA789012",
    student: { "_id": { "$oid": "65b75a58170348a2aca61fea" }, "name": "chandra", "rollNumber": "20bq1a05p2", "collegeMail": "20bq1a05p2@vvit.net", "personalMail": "gnanachandra2003@gmail.com", "password": "$2a$10$MhpoqrntiXMWzS/ozfFf9uKD4CCqweaV.g5wl4nY/Fee4ur1V9/kG", "contact": "7702663224", "branch": "CSE", "section": "D", "image": "https://storage.googleapis.com/filesharingapplication/gnanachandra_photo.jpg", "passoutYear": { "$numberInt": "2024" }, "isActive": true, "deviceTokens": [], "role": "student", "createdAt": { "$date": { "$numberLong": "1706515032991" } }, "updatedAt": { "$date": { "$numberLong": "1706515032991" } }, "__v": { "$numberInt": "0" } },
    issueDate: "2023-07-20",
    expiryDate: "2025-07-20",
    branch: "CSO",
    tags: "Python, Programming, Fundamentals",
    link: "https://www.coursera.org/certificates/python-fundamentals",
  },
  {
    name: "Data Science Specialization",
    issuer: "Udacity",
    certificateId: "UD456789",
    student: { "_id": { "$oid": "65b75a58170348a2aca61fea" }, "name": "chandra", "rollNumber": "20bq1a05p2", "collegeMail": "20bq1a05p2@vvit.net", "personalMail": "gnanachandra2003@gmail.com", "password": "$2a$10$MhpoqrntiXMWzS/ozfFf9uKD4CCqweaV.g5wl4nY/Fee4ur1V9/kG", "contact": "7702663224", "branch": "CSE", "section": "D", "image": "https://storage.googleapis.com/filesharingapplication/gnanachandra_photo.jpg", "passoutYear": { "$numberInt": "2024" }, "isActive": true, "deviceTokens": [], "role": "student", "createdAt": { "$date": { "$numberLong": "1706515032991" } }, "updatedAt": { "$date": { "$numberLong": "1706515032991" } }, "__v": { "$numberInt": "0" } },
    issueDate: "2023-09-15",
    expiryDate: "2025-09-15",
    branch: "CSE",
    tags: "Data Science, Machine Learning, Specialization",
    link: "https://www.udacity.com/course/data-science-nanodegree--nd025",
  },
  {
    name: "Web Development Bootcamp",
    issuer: "FreeCodeCamp",
    certificateId: "FCC123ABC",
    student: { "_id": { "$oid": "65b75a58170348a2aca61fea" }, "name": "chandra", "rollNumber": "20bq1a05p2", "collegeMail": "20bq1a05p2@vvit.net", "personalMail": "gnanachandra2003@gmail.com", "password": "$2a$10$MhpoqrntiXMWzS/ozfFf9uKD4CCqweaV.g5wl4nY/Fee4ur1V9/kG", "contact": "7702663224", "branch": "CSE", "section": "D", "image": "https://storage.googleapis.com/filesharingapplication/gnanachandra_photo.jpg", "passoutYear": { "$numberInt": "2024" }, "isActive": true, "deviceTokens": [], "role": "student", "createdAt": { "$date": { "$numberLong": "1706515032991" } }, "updatedAt": { "$date": { "$numberLong": "1706515032991" } }, "__v": { "$numberInt": "0" } },
    issueDate: "2023-11-28",
    expiryDate: "2025-11-28",
    branch: "IT",
    tags: "Web Development, Programming, Bootcamp,Rust,Kubernetes",
    link: "https://www.freecodecamp.org/certification/yourusername/full-stack",
  },
];

export const certificationTableColumns = [
  {
    header: "Issuer",
    cell: ({ row }) => {
      return (

        <img
          src={
            "https://cdn.iconscout.com/icon/free/png-256/free-google-160-189824.png"
          }
          alt={row.original.issuer}
          className="h-10 w-10 rounded-full"
        />

      );
    },
  },
  {
    header: "Issuer Name",
    accessorKey: "issuer",
  },
  {
    header: "Certification Name",
    accessorKey: "name",
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
    header: "Branch",
    accessorKey: "branch",
  },
  {
    header: "Passout Year",
    cell: ({ row }) => {
      return (
        <p>{"2022"}</p>
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
    header: "Certificate",
    cell: ({ row }) => {
      return (
        <a href={row.original.link} target="_blank" rel="noreferrer">
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
  }
];
