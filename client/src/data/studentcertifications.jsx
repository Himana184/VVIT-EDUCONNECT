import DeleteDialog from "@/components/common/DeleteDialog";
import EditCertification from "@/components/certifications/EditCertification";
import { deleteCertification } from "@/redux/certificationSlice";

import { Badge } from "@/components/ui/badge";
export const certificationTableColumns = [
  {
    header: "Issuer",
    cell: ({ row }) => {
      return (

        <img
          src={row.original.issuer ||
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
          {JSON.stringify(row.original.tags)}
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
    header: "Edit",
    id: "EditAction",
    enableHiding: false,
    cell: ({ row }) => {

      const certification = row.original;
      return <EditCertification data={certification} />;
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
