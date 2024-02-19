import DeleteDialog from "@/components/common/DeleteDialog";
import EditCoordinator from "@/components/coordinator/EditCoordinator";
import { Switch } from "@/components/ui/switch";

export const coordinatorsData = [
  {
    name: "John Doe",
    email: "john@example.com",
    contact: "1234567890",
    branch: "CSE",
    role: "user",
    image: "john.jpg",
    loginAccess: true,
  },
  {
    name: "Jane Doe",
    email: "jane@example.com",
    contact: "9876543210",
    branch: "ECE",
    role: "admin",
    image: "jane.jpg",
    loginAccess: true,
  },
  {
    name: "Alice Smith",
    email: "alice@example.com",
    contact: "9876123450",
    branch: "EEE",
    role: "user",
    image: "alice.jpg",
    loginAccess: false,
  },
  {
    name: "Bob Johnson",
    email: "bob@example.com",
    contact: "1234789056",
    branch: "IT",
    role: "user",
    image: "bob.jpg",
    loginAccess: true,
  }
];

export const coordinatorTableColumns = [
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
    accessorKey: "email",
  },
  {
    header: "Contact",
    accessorKey: "contact",
  },
  {
    header: "Branch",
    accessorKey: "branch",
  },
  {
    header: "Login Access",
    id: "loginAccess",
    cell: ({ row }) => {
      console.log(row.original.loginAccess == true ? "on" : "off")
      return (
        <Switch defaultChecked={row.original.loginAccess} />
      )
    }
  },
  {
    header: "Edit",
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const coordinator = row.original;
      return <EditCoordinator data={coordinator} />;
    },
  },
  {
    header: "Delete",
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const coordinator = row.original;
      return (
        <div className="flex">
          <DeleteDialog
            type="coordinator"
            dialogTitle={"Are you sure to delete coordinator details"}
            data={coordinator}
            dialogDescription={
              "This action is irreversible click delete to delete the details permanently"
            }
          // handleDelete={deleteCoordinator}
          />
        </div>
      );
    },
  },
];
