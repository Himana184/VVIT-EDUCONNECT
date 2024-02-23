import { Badge } from "@/components/ui/badge"

export const internshipsData = [
  {
    companyName: "Accenture",
    role: "Industry X Intern",
    stipend: '15,000',
    startDate: "02-02-2024",
    endDate: "02-06-2024",
    internshipDomain: "MERN, GCP, AWS, DEVOPS",
    internshipType: "on-site",
    branch: "CSE",
    verificationStatus: "pending"
  },
  {
    companyName: "capgemini",
    role: "Software Intern",
    stipend: '10,000',
    startDate: "12-02-2024",
    endDate: "22-06-2024",
    internshipDomain: "MERN, DEVOPS",
    internshipType: "remote",
    branch: "CSE",
    verificationStatus: "verified"
  },
  {
    companyName: "coagnizant",
    role: "GEN C Pro Intern",
    stipend: '10,000',
    startDate: "02-01-2024",
    endDate: "02-04-2024",
    internshipDomain: "MEAN, DEVOPS",
    internshipType: "hybrid",
    branch: "CSE",
    verificationStatus: "pending"
  }
]

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
  }
]