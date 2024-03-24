import DeleteDialog from "@/components/common/DeleteDialog";
import EditCoordinator from "@/components/coordinator/EditCoordinator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { deleteUser } from "@/redux/userSlice";

export const coordinatorTableColumns = [
  {
    header: "Image", cell: ({ row }) => {
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
    header: "Role",
    accessorKey: "role"
  },
  // {
  //   header: "Login Access",
  //   id: "loginAccess",
  //   cell: ({ row }) => {

  //     return (
  //       <Switch defaultChecked={row.original.loginAccess} />
  //     )
  //   }
  // },
  {
    header: "Edit",
    id: "EditAction",
    enableHiding: false,
    cell: ({ row }) => {

      const coordinator = row.original;
      return <EditCoordinator data={coordinator} />;
    },
  },
  {
    header: "Delete",
    id: "DeleteAction",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex">
          <DeleteDialog
            type="user"
            dialogTitle={"Are you sure to delete user details"}
            data={user}
            dialogDescription={
              "This action is irreversible click delete to delete the details permanently"
            }
            handleDelete={deleteUser}
          />
        </div>
      );
    },
  },
];
