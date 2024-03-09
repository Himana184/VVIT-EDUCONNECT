import { Badge } from "@/components/ui/badge"
import DeleteDialog from "@/components/common/DeleteDialog";
//import EditCertification from "@/components/certifications/EditCertification";
import { Switch } from "@/components/ui/switch";
import { deleteInternship } from "@/redux/internshipSlice";
import { useDispatch } from "react-redux";
import { formatDate } from "@/utils/formatDate";
//import { Badge } from "@/components/ui/badge";


export const internshipTableColumns = [
  {
    header: "Company name",
    accessorKey: "companyName"
  },
  {
    header: "Role",
    accessorKey: "role",
  },
  {
    header: "Stipend",
    accessorKey: "stipend",
  },
  {
    header: "Student Name",
    cell: ({ row }) => {
      return (
        <p>{row.original.student.name}</p>
      )
    }
  },
  {
    header: "Branch",
    accessorKey: "branch",
  },
  // {
  //   header: "Domain",
  //   accessorKey: "internshipDomain",
  //   cell: ({ row }) => {
  //     return <p>{JSON.stringify(row.original.internshipDomain)}</p>
  //   }
  // },

  {
    header: "Duration (MM/YY)",
    accessorKey: "startDate",
    cell: ({ row }) => {
      return <p className="w-max">{formatDate(row.original.startDate)} to {formatDate(row.original.endDate)}</p>
    }
  },

  {
    header: 'Internship Type',
    accessorKey: "internshipType",

  }, {
    header: "Verification status",
    accessorKey: "verificationStatus",
    cell: ({ row }) => {
      const status = row.original.verificationStatus;
      console.log(status)
      if (status == "pending") {
        return (
          <Badge className={"bg-yellow-500 hover:bg-yellow-600"}>{status}</Badge>
        )
      } else if (status == "verified") {
        return (
          <Badge className={"bg-green-500 hover:bg-green-600"}>{status}</Badge>
        )
      } else {
        return (
          <Badge className={"bg-red-500 hover:bg-red-600"}>{status}</Badge>
        )
      }

    }
  },
  // {
  //   header: "Actions",
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex items-center space-x-3">
  //         <Badge className={"bg-green-500 text-black hover:bg-green-600 hover:text-white cursor-pointer"}>Verify</Badge>
  //         <Badge variant={"destructive"} className={"cursor-pointer"} >Reject</Badge>
  //       </div>
  //     )
  //   }
  // },
  {
    header: "Delete",
    id: "DeleteAction",
    enableHiding: false,
    cell: ({ row }) => {
      const internship = row.original;
      return (
        <div className="flex">
          <DeleteDialog
            type="internship"
            dialogTitle={"Are you sure to delete internship details"}
            data={internship}
            dialogDescription={
              "This action is irreversible click delete to delete the details permanently"
            }
            handleDelete={deleteInternship}
          />
        </div>
      );
    },
  },

]