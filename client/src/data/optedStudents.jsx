import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const optedStudentsTableColumns = [
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
      return row.original.name;
    },
  },
  {
    header: "Email",
    accessorKey: "student[collegeMail]",
    accessorFn: (row) => {
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
