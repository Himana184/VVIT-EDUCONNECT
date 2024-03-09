/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { TrashIcon } from "@heroicons/react/24/outline"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const DeleteDialog = ({ dialogTitle, dialogDescription, data, handleDelete, type }) => {


  const { isLoading } = useSelector((state) => state[type]);

  // State to maintain the close and opening of delete dialog
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  //function that will dispatch the delete function received as parameter
  const handleDeleteAction = async () => {
    const response = await dispatch(handleDelete({ data }));
    console.log(response)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <TrashIcon className="text-red-500 cursor-pointer h-7 w-7 hover:text-red-700" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="space-y-4">
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>
            {dialogDescription}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={handleDeleteAction}
            variant="destructive"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                Deleting
                <Loader2 className="w-4 h-4 ml-2 animate-spin" />
              </>
            ) : (
              "Delete"
            )}
          </Button>
          {/* <Button variant="destructive" onClick={handleDeleteAction}>Delete</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteDialog