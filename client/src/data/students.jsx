import { Link } from "react-router-dom";
import DeleteDialog from "@/components/common/DeleteDialog";
import { deleteStudent } from "@/redux/studentSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export const studentTableColumns = [
  {
    header: "Image",
    cell: ({ row }) => {
      return (
        <Avatar className="cursor-pointer">
          <AvatarImage
            src={row.original.image}
            alt="avatar"
          />
          <AvatarFallback>{row.original.name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>)
    },
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => {
      return <Link to={`${row.original._id}/profile`}>
        {row.original.name}</Link>;
    },
  },
  {
    header: "Roll No",
    accessorKey: "rollNumber",
  },
  {
    header: "Branch",
    accessorKey: "branch",
  },
  {
    header: "Section",
    accessorKey: "section",
  },
  {
    header: "Contact",
    accessorKey: "contact",
  },
  {
    header: 'Internships',
    accessorKey: "internshipsCount"
  }, {
    header: "Certifications",
    accessorKey: "certificationsCount"
  },
  {
    header: "Passout Year",
    accessorKey: "passoutYear",
  },
  {
    header: "Delete",
    id: "DeleteAction",
    enableHiding: false,
    cell: ({ row }) => {
      const student = row.original;
      return (
        <div className="flex">
          <DeleteDialog
            type="user"
            dialogTitle={"Are you sure to delete student details"}
            data={student}
            dialogDescription={
              "This action is irreversible click delete to delete the details permanently"
            }
            handleDelete={deleteStudent}
          />
        </div>
      );
    },
  },

  // {
  //   header: "Actions",
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const student = row.original;
  //     return <div className="flex space-x-3">
  //       {/* <EditStudent data={student} /> */}
  //       {/* <DeleteDialog
  //         type="student"
  //         dialogTitle={"Are you sure to delete student details"}
  //         data={student}
  //         dialogDescription={
  //           "This action is irreversible click delete to delete the details permanently"
  //         }
  //         handleDelete={generateYears}
  //       /> */}
  //     </div>;
  //   },
  // }
];

export const studentProfileSidebarItems = [
  {
    title: "Profile",
    href: "profile",
  },
  {
    title: "Internships",
    href: "internships"
  },
  {
    title: "Certifications",
    href: "certifications"
  },
  {
    title: "Courses",
    href: "courses"
  },
  {
    title: "Opted Jobs",
    href: "optedJobs"
  },
]
