import { Badge } from "@/components/ui/badge"
import DeleteDialog from "@/components/common/DeleteDialog";
//import EditCertification from "@/components/certifications/EditCertification";
import { Switch } from "@/components/ui/switch";
import { deleteInternship } from "@/redux/internshipSlice";
import { useDispatch } from "react-redux";
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
    header: "Branch",
    accessorKey: "branch",
  },
  {
    header: "Domain",
    accessorKey: "internshipDomain"
  },

  {
    header: "Start Date",
    accessorKey: "startDate",
  },
  {
    header: "End Date",
    accessorKey: "endDate",
  },
  {
    header: 'Internship Type',
    accessorKey: "internshipType"
  }, {
    header: "Verification status",
    accessorKey: "verificationStatus"
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-3">
          <Badge className={"bg-green-500 text-black hover:bg-green-600 hover:text-white cursor-pointer"}>Verify</Badge>
          <Badge variant={"destructive"} className={"cursor-pointer"} >Reject</Badge>
        </div>
      )
    }
  },
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