export const optedStudentsTableColumns = [
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
    header: "Email",
    accessorKey: "student[collegeMail]",
    accessorFn: (row) => {
      console.log(row)
      return row.original.collegeMail || ""
    },
    cell: ({ row }) => {
      return <p>{row.original.collegeMail || ""}</p>;
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
    header: "Passout Year",
    accessorKey: "passoutYear",
  }

];
