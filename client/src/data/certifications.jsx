import DeleteDialog from "@/components/common/DeleteDialog";
import { deleteCertification } from "@/redux/certificationSlice";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/formatDate";

export const adminCertificationTableColumns = [

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
    accessorKey: "student[name]",
    accessorFn: (row) => {
      return row.student.name
    },
    cell: ({ row }) => {
      return <p>{row.original.student.name}</p>;
    },
  },
  {
    header: "Roll No",
    accessorKey: "student[rollNumber]",
    accessorFn: (row) => {
      return row.student.rollNumber
    },
    cell: ({ row }) => {
      return (
        <p>{row.original.student.rollNumber || "Roll Number"}</p>
      )
    }
  },
  {
    header: "Branch",
    accessorKey: "student[branch]",
    accessorFn: (row) => {
      return row.student.branch
    },
    cell: ({ row }) => {
      return <p>{row.original.student.branch}</p>
    }
  },
  {
    header: "Passout Year",
    accessorKey: "student[passoutYear]",
    accessorFn: (row) => {
      return row.student.passoutYear
    },
    cell: ({ row }) => {
      return <p>{row.original.student.passoutYear}</p>
    }
  },
  {
    header: "Tags",
    accessorKey: "tags",
    cell: ({ row }) => {
      return (
        <div className="flex flex-wrap gap-x-2 gap-y-1 justify-start ">
          {
            row.original.tags.split(",").map((tag, index) => {
              return (
                <Badge key={index} variant={"outline"}>{tag}</Badge>
              )
            })
          }
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
    header: "Delete",
    id: "DeleteAction",
    enableHiding: false,
    cell: ({ row }) => {
      const certification = row.original;
      return (
        <div className="flex">
          <DeleteDialog
            type="certification"
            dialogTitle={"Are you sure to delete user details"}
            data={certification}
            dialogDescription={
              "This action is irreversible click delete to delete the details permanently"
            }
            handleDelete={deleteCertification}
          />
        </div>
      );
    },
  },
];

export const studentCertificationTableColumns = [
  {
    header: "Issuer Name",
    accessorKey: "issuer",
  },
  {
    header: "Certification Name",
    accessorKey: "name",
  },
  {
    header: "Issue Date",
    accessorKey: "issueDate",
    cell: ({ row }) => {
      return (
        <p>{formatDate(row.original.issueDate)}</p>
      )
    }
  },
  {
    header: "Tags",
    accessorKey: "tags",
    cell: ({ row }) => {
      return (
        <div className="flex flex-wrap gap-x-2 gap-y-1 justify-start ">
          {
            row.original.tags.split(",").map((tag, index) => {
              return (
                <Badge key={index} variant={"outline"}>{tag}</Badge>
              )
            })
          }
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
    header: "Delete",
    id: "DeleteAction",
    enableHiding: false,
    cell: ({ row }) => {
      const certification = row.original;
      return (
        <div className="flex">
          <DeleteDialog
            type="certification"
            dialogTitle={"Are you sure to delete user details"}
            data={certification}
            dialogDescription={
              "This action is irreversible click delete to delete the details permanently"
            }
            handleDelete={deleteCertification}
          />
        </div>
      );
    },
  },
];

export const profileCertificationColumns = [

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
        <p>{row.original.student.name || "Name"}</p>
      )
    }
  },
  {
    header: "Roll No",
    cell: ({ row }) => {
      return (
        <p>{row.original.student.rollNumber || "Roll Number"}</p>
      )
    }
  },
  {
    header: "Branch",
    accessorKey: "branch",
    cell: ({ row }) => {
      return (
        <p>{row.original.student.branch || "Branch"}</p>
      )
    }
  },
  {
    header: "Passout Year",
    cell: ({ row }) => {
      return (
        <p>{row.original.student.passoutYear || "20**"}</p>
      )
    }
  },
  {
    header: "Tags",
    accessorKey: "tags",
    cell: ({ row }) => {
      return (
        <div className="flex flex-wrap gap-x-2 gap-y-1 justify-start ">
          {
            row.original.tags.split(",").map((tag, index) => {
              return (
                <Badge key={index} variant={"outline"}>{tag}</Badge>
              )
            })
          }
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
    header: "Delete",
    id: "DeleteAction",
    enableHiding: false,
    cell: ({ row }) => {
      const certification = row.original;
      return (
        <div className="flex">
          <DeleteDialog
            type="certification"
            dialogTitle={"Are you sure to delete user details"}
            data={certification}
            dialogDescription={
              "This action is irreversible click delete to delete the details permanently"
            }
            handleDelete={deleteCertification}
          />
        </div>
      );
    },
  },
];
