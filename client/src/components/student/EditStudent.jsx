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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PencilSquareIcon } from "@heroicons/react/24/outline"
import { useForm } from "react-hook-form"
import { FormError } from "../common/FormError"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { errorToast, successToast } from "@/utils/toastHelper"
// import { updateMentor } from "@/redux/mentorSlice"
import { Loader2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { branches } from "@/data/branches"

const EditStudent = ({ data }) => {
  const isLoading = false;
  const dispatch = useDispatch();
  const form = useForm();
  const { register, handleSubmit, formState, clearErrors, reset } = form;
  const { errors } = formState;
  const [open, setOpen] = useState(false);
  const handleEditMentorDetails = async (newData) => {
    newData = JSON.parse(JSON.stringify(newData));
    console.log(newData)
    const response = await dispatch(({ ...newData, _id: data._id }));

    if (response.meta.requestStatus == "fulfilled") {
      setOpen(!open);
      // successToast(response.payload.message);
    } else {
      // errorToast(response.payload.message);
    }
  }
  useEffect(() => {
    clearErrors();
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <PencilSquareIcon className="text-gray-700 cursor-pointer h-7 w-7 hover:text-black" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[500px] overflow-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle>Edit student details</DialogTitle>
          <DialogDescription>
            Make changes to the students details here
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit(handleEditMentorDetails)}>
          <div className="space-y-2">
            <Label>Student name</Label>
            <Input type="text"
              defaultValue={data?.name}
              placeholder="Student name"
              {...register("name", {
                required: {
                  value: true,
                  message: "Student name is required"
                }
              })} />
            {errors["name"] && <FormError message={errors["name"].message} />}
          </div>

          <div className="space-y-2">
            <Label>Branch</Label>
            <Select defaultValue={data?.branch} {...register("branch", {
              required: {
                value: true,
                message: "Student branch is required"
              }
            })}>
              <SelectTrigger>
                <SelectValue placeholder="Branch" />
              </SelectTrigger>
              <SelectContent>
                {
                  branches.map((branch, index) => {
                    return (
                      <SelectItem key={index} value={branch}>{branch}</SelectItem>
                    )
                  })
                }
              </SelectContent>
            </Select>
            {errors["name"] && <FormError message={errors["name"].message} />}
          </div>

          <div className="space-y-2">
            <Label>Roll number</Label>
            <Input type="text"
              disabled={true}
              defaultValue={data?.rollNumber}
              placeholder="20BQ1A****"
              {...register("rollNumber")} />
            {errors["rollNumber"] && (
              <FormError message={errors["rollNumber"].message} />
            )}
          </div>

          <div className="space-y-2">
            <Label>College mail</Label>
            <Input type="text"
              disabled={true}
              defaultValue={data?.collegeMail}
              placeholder="20BQ1A****@vvit.net"
              {...register("collegeMail")} />
            {errors["collegeMail"] && (
              <FormError message={errors["collegeMail"].message} />
            )}
          </div>

          <div className="space-y-2">
            <Label>Personal mail</Label>
            <Input type="text"
              defaultValue={data?.personalMail}
              placeholder="johndoe@example.com"
              {...register("personalMail", {
                required: {
                  value: true,
                  message: "Student personal mail is required"
                }
              })} />
            {errors["personalMail"] && (
              <FormError message={errors["personalMail"].message} />
            )}
          </div>

          <div className="space-y-2">
            <Label>Contact</Label>
            <Input type="text"
              defaultValue={data?.contact}
              placeholder="contact"
              {...register("contact", {
                required: {
                  value: true,
                  message: "Student contact is required"
                }
              })} />
            {errors["contact"] && <FormError message={errors["contact"].message} />}
          </div>

          {/* Students Count */}
          <div className="space-y-2">
            <Label>Students Count</Label>
            <Input
              defaultValue={data?.studentsCount}
              type="text"
              placeholder="10"
              {...register("studentsCount", {
                required: {
                  value: true,
                  message: "Students count Name is required",
                },
                validate: {
                  isValidNumber: (fieldValue) => {
                    return Number(fieldValue) || "Enter a valid student count";
                  },
                },
              })}

            />
            {errors["studentsCount"] && (
              <FormError message={errors["studentsCount"].message} />
            )}
          </div>
          {/* Rating */}
          <div className="space-y-2">
            <Label>Rating</Label>
            <Input
              type="text"
              placeholder="5"
              defaultValue={data?.rating}
              {...register("rating", {
                required: {
                  value: true,
                  message: "Rating is required",
                },
                validate: {
                  isValidNumber: (fieldValue) => {
                    return Number(fieldValue) || "Enter a valid rating";
                  },
                },
              })}
            />
            {errors["rating"] && (
              <FormError message={errors["rating"].message} />
            )}
          </div>

          {/* Appointment Link */}
          <div className="space-y-2">
            <Label>Appointment Link</Label>
            <Input
              defaultValue={data?.appointmentLink}
              type="text"
              placeholder="https://www.vconnectglobe.com/booking/"
              {...register("appointmentLink", {
                required: {
                  value: true,
                  message: "Appointment Link is required",
                }
              })}
            />
            {errors["appointmentLink"] && (
              <FormError message={errors["appointmentLink"].message} />
            )}
          </div>
          <div className="flex justify-end">
            <Button type="submit">{isLoading ? (
              <>
                saving
                <Loader2 className="w-4 h-4 ml-2 animate-spin" />
              </>
            ) : (
              "Save changes"
            )}</Button>
          </div>
        </form>

        <DialogFooter>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditStudent