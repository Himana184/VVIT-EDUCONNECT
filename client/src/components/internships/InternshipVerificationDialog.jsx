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
import { Input } from "../ui/input"
import { useForm } from "react-hook-form"
import { FormError } from "../common/FormError"
import { Label } from "../ui/label"

const InternshipVerificationDialog = ({ dialogTitle, dialogDescription, data, handleAction, type, verificationType }) => {
  const form = useForm();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState, clearErrors } = form;
  const { errors } = formState;

  const { isLoading } = useSelector((state) => state[type]);
  const [open, setOpen] = useState(false);

  //function that will dispatch the delete function received as parameter
  const handleVerification = async (values) => {
    // Internship ID
    values.id = data._id;
    values.verificationStatus = verificationType === "Rejected" ? "Verified" : "Rejected"

    const response = await dispatch(handleAction(values));
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {
          verificationType == "Rejected" ? <CheckBadgeIcon size={20} className="h-8 border-green-500 text-green-500 cursor-pointer">Verify</CheckBadgeIcon> :
            <XMarkIcon size={20} className="h-8 border-red-500 text-red-500 cursor-pointer">Reject</XMarkIcon>
        }
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="space-y-4">
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>
            {dialogDescription}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleVerification)} className="space-y-5">
          {
            verificationType == "Verified" && <div className="space-y-3">
              <Label>Rejection Comment</Label>
              <Input type="text" {...register("comment", {
                required: {
                  value: true,
                  message: "Rejection Comment is required"
                }
              })} />
              {errors["comment"] && <FormError message={errors["comment"].message} />}
            </div>
          }

          <DialogFooter>
            <Button
              type="submit"
              className={`${verificationType == "Rejected" && "bg-green-500 border-green-400 hover:bg-green-600"}`}
              variant={verificationType == "Rejected" ? "default" : "destructive"}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  {verificationType == "Rejected" ? "verifying" : "rejecting"}
                  <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                </>
              ) : (
                verificationType == "Rejected" ? "Verify" : "Reject"
              )}
            </Button>

          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default InternshipVerificationDialog