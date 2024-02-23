export const optedStudents = [
  {
    name: "John Doe",
    rollNumber: "2023001",
    personalMail: "john.doe.personal@example.com",
    contact: "1234567890",
    branch: "EEE",
    section: "A",
    image: "https://example.com/john_doe_image.jpg",
    passoutYear: 2023,
    optedOn: "02-02-2024"
  },
  {
    name: "Jane Smith",
    rollNumber: "2023002",
    personalMail: "jane.smith.personal@example.com",
    contact: "9876543210",
    branch: "Electrical Engineering",
    section: "B",
    image: "https://example.com/jane_smith_image.jpg",
    passoutYear: 2022,
    optedOn: "01-02-2024"
  },
  {
    name: "Ala Smith",
    rollNumber: "2023032",
    personalMail: "ala.smith.personal@example.com",
    contact: "9876573210",
    branch: "ECE",
    section: "D",
    image: "https://example.com/jane_smith_image.jpg",
    passoutYear: 2022,
    optedOn: "31-01-2024"
  },
];

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
  }, {
    header: "Opted on",
    accessorKey: "optedOn"
  }

];
