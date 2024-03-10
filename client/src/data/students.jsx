import { Link } from "react-router-dom";

export const studentTableColumns = [
  {
    header: "Image",
    cell: ({ row }) => {
      return <img src={"https://docs.material-tailwind.com/img/face-2.jpg"} alt={row.original.name} className="h-10 w-10 rounded-full" />;
    },
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => {
      return <Link to={`${row.original._id}`}>
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
    href: "",
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
