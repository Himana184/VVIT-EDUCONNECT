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
import { CheckBadgeIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const ApproveDialog = ({ dialogTitle, dialogDescription, data, handleAction, type, verificationType }) => {

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state[type]);

  const [open, setOpen] = useState(false);

  //function that will dispatch the delete function received as parameter
  const handleDeleteAction = async () => {
    const response = await dispatch(handleAction({ data }));
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <CheckBadgeIcon size={20} className="h-8 border-green-500 text-green-500 cursor-pointer">Verify</CheckBadgeIcon>
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

export default ApproveDialog