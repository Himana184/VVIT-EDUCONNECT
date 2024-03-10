import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/formatDate";

export const studentOptedJobs = [
  {
    header: "Company Logo",
    cell: ({ row }) => {
      return <img src={row.original.companyLogo} alt={row.original.name} className="aspect-square h-10 w-10 rounded-full" />;
    },
  },
  {
    header: "Company Name",
    accessorKey: "companyName",
  },
  {
    header: "Salary",
    accessorKey: "salary",
  },
  {
    header: "Roles",
    cell: ({ row }) => {
      return (
        <p>{row.original?.roles?.join(",")}</p>
      )
    }
  },
  {
    header: "Last Date",
    cell: ({ row }) => {
      return (
        <p>{formatDate(row.original.lastDate)}</p>
      )
    }
  },
  {
    header: "Skills",
    cell: ({ row }) => {
      return (
        row.original.skills["0"].split(",").map((skill, index) => {
          return (
            <Badge key={index} variant={"outline"}>{skill}</Badge>
          )
        })
      )
    }
  }

];
