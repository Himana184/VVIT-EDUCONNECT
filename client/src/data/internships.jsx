import { Badge } from "@/components/ui/badge"
import DeleteDialog from "@/components/common/DeleteDialog";
import { deleteInternship, handleInternshipVerification } from "@/redux/internshipSlice";
import { formatDate } from "@/utils/formatDate";
import { FileCheck2, FileDown } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import InternshipVerificationDialog from "@/components/internships/InternshipVerificationDialog";
import EditInternship from "@/components/internships/EditInternship";


export const adminInternshipTableColumns = [
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
    accessorKey: "branch",
  },
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
      console.log(row.original);
      return (
        <>
          {status === "Pending" && (
            <Badge className={"bg-yellow-500 hover:bg-yellow-600"}>{status}</Badge>
          )}
          {status === "Verified" && (
            <Badge className={"bg-green-500 hover:bg-green-600"}>{status}</Badge>
          )}
          {status === "Rejected" && status !== "Verified" && row.original.comment && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className={"bg-red-500 hover:bg-red-600 cursor-pointer text-white w-fit p-1 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 "}>{status}</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{row.original.comment}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </>
      );
    }

  },
  {
    header: "Documents",
    accessorKey: "offerLetter",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          {
            row.original.offerLetter && <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a href={row.original.offerLetter} target="_blank" rel="noreferrer">
                    <FileDown className="cursor-pointer" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Offer Letter</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          }
          {
            row.original.completionCertificate && <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a href={row.original.completionCertificate} target="_blank" rel="noreferrer">
                    <FileCheck2 className="cursor-pointer" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Completion Certificate</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          }

        </div>
      )
    }
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const internship = row.original;
      console.log(internship.verificationStatus)
      return (
        <div className="flex items-center space-x-3">
          {
            internship.verificationStatus == "Pending" && <>
              <InternshipVerificationDialog type="internship" dialogTitle={"Are you sure to Approve this internship ?"} data={internship} dialogDescription={"Please verify the details correctly before approving"} handleAction={handleInternshipVerification} verificationType={"Verified"} />
              <InternshipVerificationDialog type="internship" dialogTitle={"Are you sure to Reject this internship ?"} data={internship} dialogDescription={"Please verify the details correctly before rejecting"} handleAction={handleInternshipVerification} verificationType={"Rejected"} /></>
          }
          {
            internship.verificationStatus == "Verified" && <InternshipVerificationDialog type="internship" dialogTitle={"Are you sure to Reject this internship ?"} data={internship} dialogDescription={"Please verify the details correctly before rejecting"} handleAction={handleInternshipVerification} verificationType={"Verified"} />
          }
          {
            internship.verificationStatus == "Rejected" && <InternshipVerificationDialog type="internship" dialogTitle={"Are you sure to Approve this internship ?"} data={internship} dialogDescription={"Please verify the details correctly before approving"} handleAction={handleInternshipVerification} verificationType={"Rejected"} />

          }

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

export const studentInternshipTableColumns = [
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
    header: "Duration (DD/MM/YY)",
    accessorKey: "startDate",
    cell: ({ row }) => {
      return <p className="w-max">{formatDate(row.original.startDate)} to {formatDate(row.original.endDate)}</p>
    }
  },

  {
    header: 'Internship Type',
    accessorKey: "internshipType",

  },
  {
    header: "Documents",
    accessorKey: "offerLetter",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          {
            row.original.offerLetter && <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a href={row.original.offerLetter} target="_blank" rel="noreferrer">
                    <FileDown className="cursor-pointer" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Offer Letter</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          }
          {
            row.original.completionCertificate && <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a href={row.original.completionCertificate} target="_blank" rel="noreferrer">
                    <FileCheck2 className="cursor-pointer" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Completion Certificate</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          }

        </div>
      )
    }
  },
  {
    header: "Verification status",
    accessorKey: "verificationStatus",
    cell: ({ row }) => {
      const status = row.original.verificationStatus;
      console.log(row.original);
      return (
        <>
          {status === "Pending" && (
            <Badge className={"bg-yellow-500 hover:bg-yellow-600"}>{status}</Badge>
          )}
          {status === "Verified" && (
            <Badge className={"bg-green-500 hover:bg-green-600"}>{status}</Badge>
          )}
          {status === "Rejected" && status !== "Verified" && row.original.comment && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className={"bg-red-500 hover:bg-red-600 cursor-pointer text-white w-fit p-1 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 "}>{status}</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{row.original.comment}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </>
      );
    }

  },
  // {
  //   header: "Edit",
  //   id: "EditAction",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     return (
  //       <EditInternship internship={row.original} />
  //     );
  //   },
  // },
  {
    header: "Delete",
    id: "DeleteAction",
    enableHiding: false,
    cell: ({ row }) => {
      const internship = row.original;
      return (
        row.original.verificationStatus != "Verified" ? <div className="flex">
          <DeleteDialog
            type="internship"
            dialogTitle={"Are you sure to delete internship details"}
            data={internship}
            dialogDescription={
              "This action is irreversible click delete to delete the details permanently"
            }
            handleDelete={deleteInternship}
          />
        </div> : (
          <p>--</p>
        )
      )
    },
  },

]

export const profileInternshipColumns = [
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
      console.log(row.original);
      return (
        <>
          {status === "Pending" && (
            <Badge className={"bg-yellow-500 hover:bg-yellow-600"}>{status}</Badge>
          )}
          {status === "Verified" && (
            <Badge className={"bg-green-500 hover:bg-green-600"}>{status}</Badge>
          )}
          {status === "Rejected" && status !== "Verified" && row.original.comment && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className={"bg-red-500 hover:bg-red-600 cursor-pointer text-white w-fit p-1 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 "}>{status}</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{row.original.comment}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </>
      );
    }

  },
  {
    header: "Documents",
    accessorKey: "offerLetter",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          {
            row.original.offerLetter && <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a href={row.original.offerLetter} target="_blank" rel="noreferrer">
                    <FileDown className="cursor-pointer" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Offer Letter</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          }
          {
            row.original.completionCertificate && <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a href={row.original.completionCertificate} target="_blank" rel="noreferrer">
                    <FileCheck2 className="cursor-pointer" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Completion Certificate</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          }

        </div>
      )
    }
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const internship = row.original;
      console.log(internship.verificationStatus)
      return (
        <div className="flex items-center space-x-3">
          {
            internship.verificationStatus == "Pending" && <>
              <InternshipVerificationDialog type="internship" dialogTitle={"Are you sure to Approve this internship ?"} data={internship} dialogDescription={"Please verify the details correctly before approving"} handleAction={handleInternshipVerification} verificationType={"Verified"} />
              <InternshipVerificationDialog type="internship" dialogTitle={"Are you sure to Reject this internship ?"} data={internship} dialogDescription={"Please verify the details correctly before rejecting"} handleAction={handleInternshipVerification} verificationType={"Rejected"} /></>
          }
          {
            internship.verificationStatus == "Verified" && <InternshipVerificationDialog type="internship" dialogTitle={"Are you sure to Reject this internship ?"} data={internship} dialogDescription={"Please verify the details correctly before rejecting"} handleAction={handleInternshipVerification} verificationType={"Verified"} />
          }
          {
            internship.verificationStatus == "Rejected" && <InternshipVerificationDialog type="internship" dialogTitle={"Are you sure to Approve this internship ?"} data={internship} dialogDescription={"Please verify the details correctly before approving"} handleAction={handleInternshipVerification} verificationType={"Rejected"} />

          }

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