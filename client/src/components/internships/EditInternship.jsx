/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogFooter } from "../ui/dialog"

import { useForm } from "react-hook-form"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FormError } from "../common/FormError";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from 'react-redux';
import { updateInternship } from "@/redux/internshipSlice";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { internshipType } from "@/utils/internship";

const EditInternship = ({ internship }) => {

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state["internship"]);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(internship?.internshipType);

  //react hook form
  const form = useForm({
    defaultValues: {
      ...internship
    }
  });
  const { register, handleSubmit, formState, clearErrors } = form;
  const { errors } = formState;
  const handleEditDetails = async (data) => {
    data.internshipType = type;
    const response = await dispatch(updateInternship(data));
    console.log(response)
  }

  //clear errors of the form based on the open and close of dialog
  useEffect(() => {
    clearErrors();
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <PencilSquareIcon className="text-gray-700 cursor-pointer h-7 w-7 hover:text-secondary" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] max-h-[400px] lg:max-h-[600px] overflow-auto pb-10">
        <DialogHeader className="mb-5">
          <DialogTitle>Edit internship details</DialogTitle>
        </DialogHeader>
        <form className='space-y-6' onSubmit={handleSubmit(handleEditDetails)}>
          <div className='space-y-2'>
            <Label>Company Name</Label>
            <Input
              type="text"
              placeholder="name of the company" {...register("companyName", {
                required: {
                  value: true,
                  message: "Company name is required"
                }
              })} />
            {errors["companyName"] && <FormError message={errors["companyName"].message} />}
          </div>

          <div className='space-y-2'>
            <Label>Internship Domain</Label>
            <Input
              type="text"
              placeholder="domain of the internship" {...register("internshipDomain", {
                required: {
                  value: true,
                  message: "internship domain is required"
                }
              })} />
            {errors["internshipDomain"] && <FormError message={errors["internshipDomain"].message} />}
          </div>

          <div className='space-y-2'>
            <Label>Branch</Label>
            <Input
              type="text"
              placeholder="branch"
              {...register("branch", {
                required: {
                  value: true,
                  message: "branch is required"
                }
              })} />
            {errors["branch"] && <FormError message={errors["branch"].message} />}
          </div>
          <div className='space-y-2'>
            <Label>Role</Label>
            <Input
              type="text"
              placeholder="your role during internship"
              {...register("role", {
                required: {
                  value: true,
                  message: "role is required"
                }
              })} />
            {errors["role"] && <FormError message={errors["role"].message} />}
          </div>
          <div className='space-y-2'>
            <Label>Stipend</Label>
            <Input
              type="number"
              placeholder="enter your stipend"
              {...register("stipend", {
                required: {
                  value: true,
                  message: "stipend is required"
                }
              })} />
            {errors["stipend"] && <FormError message={errors["stipend"].message} />}
          </div>



          <div className="space-y-2">
            <Label>Internship Type</Label>
            <Select onValueChange={(e) => setType(e)} defaultValue={internship?.internshipType}>
              <SelectTrigger>
                <SelectValue placeholder="Select internship type"></SelectValue>
              </SelectTrigger>
              <SelectContent>
                {
                  internshipType.map((item, index) => {
                    return (
                      <SelectItem value={item} key={index}>{item}</SelectItem>
                    )
                  })
                }
              </SelectContent>
            </Select>
          </div>
          <div className='space-y-3'>
            <Label>Start Date</Label>
            <Input type='date' value={internship.startDate.split("T")[0]} {...register("startDate", {
              required: {
                value: true,
                message: "Start Date required"
              }, valueAsDate: true,
            })} />
            {errors["startDate"] && <FormError message={errors["startDate"].message} />}
          </div>
          <div className='space-y-3'>
            <Label>End Date</Label>
            <Input type='date' value={internship.endDate.split("T")[0]} {...register("endDate", {
              required: {
                value: true,
                message: "End Date required"
              }, valueAsDate: true,
            })} />
            {errors["endDate"] && <FormError message={errors["endDate"].message} />}
          </div>





          <DialogFooter>
            <Button type="submit" className="w-full">
              {isLoading ? (
                <>
                  saving
                  <Loader2 className="w-4 h-4 ml-2 animate-spin font-semibold" />
                </>
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditInternship