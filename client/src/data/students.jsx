import DeleteDialog from "@/components/common/DeleteDialog";
import EditStudent from "@/components/student/EditStudent";
import { generateYears } from "@/utils/generateyears";

export const studentsData = [
  {
    name: "John Doe",
    rollNumber: "2023001",
    collegeMail: "john.doe@example.com",
    personalMail: "john.doe.personal@example.com",
    password: "hashedPassword",
    contact: "1234567890",
    branch: "EEE",
    section: "A",
    image: "https://example.com/john_doe_image.jpg",
    passoutYear: 2023,
    counsellor: "counsellor_id",
    isActive: true,
    internshipsCount: 1,
    coursesCount: 10,
    certificationsCount: 1,
    role: "student",
  },
  {
    name: "Jane Smith",
    rollNumber: "2023002",
    collegeMail: "jane.smith@example.com",
    personalMail: "jane.smith.personal@example.com",
    password: "hashedPassword",
    contact: "9876543210",
    branch: "Electrical Engineering",
    section: "B",
    image: "https://example.com/jane_smith_image.jpg",
    passoutYear: 2022,
    counsellor: "counsellor_id",
    isActive: true,
    internshipsCount: 2,
    coursesCount: 10,
    certificationsCount: 15,
    role: "student",
  },
  // More student objects...
];

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
      return row.original.name;
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
