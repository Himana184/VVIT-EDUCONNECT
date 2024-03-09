/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogFooter } from "../ui/dialog"
import { PiStack } from "react-icons/pi"
import { useForm } from "react-hook-form"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FormError } from "../common/FormError";
import { Textarea } from "../ui/textarea";
import { MultiSelect } from "react-multi-select-component";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from 'react-redux';

import { updateCourse } from "@/redux/courseSlice";
import toast from 'react-hot-toast';
//import { addCertification } from "@/redux/certificationSlice";
import React from "react";

const EditCourse = () => {
  const isLoading = false;
  // State to handle dialog open and close
  const [open, setOpen] = useState(false);

  const [courseName, setName] = useState("");
  const dispatch = useDispatch();
  //const [branches, setBranches] = useState([]);
  //react hook form
  const form = useForm();
  const { register, handleSubmit, formState, clearErrors, reset } = form;
  const { errors } = formState;

  const handleEditDetails = async (data) => {
    data["courseName"] = courseName;

    const response = await dispatch(updateCourse({ data }))
    setOpen(false);

  }

  //clear errors of the form based on the open and close of dialog
  useEffect(() => {
    clearErrors();
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <PencilSquareIcon className="text-gray-700 cursor-pointer h-7 w-7 hover:text-primary" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] max-h-[400px] lg:max-h-[600px] overflow-auto pb-10">
        <DialogHeader className="mb-5">
          <DialogTitle>Edit course details</DialogTitle>
        </DialogHeader>
        <form className='space-y-6' onSubmit={handleSubmit(handleEditDetails)}>
          <div className='space-y-2'>
            <Label>Course Name</Label>
            <Input
              type="text"
              placeholder="enter name of the course" {...register("courseName", {
                required: {
                  value: true,
                  message: "Course name is required"
                }
              })} />
            {errors["courseName"] && <FormError message={errors["courseName"].message} />}
          </div>

          <div className='space-y-2'>
            <Label>Course Platform</Label>
            <Input
              type="text"
              placeholder="enter name of the platform" {...register("coursePlatform", {
                required: {
                  value: true,
                  message: "Course platform is required"
                }
              })} />
            {errors["coursePlatform"] && <FormError message={errors["coursePlatfrom"].message} />}
          </div>

          <div className="space-y-2">
            <Label>Completion Status</Label>
            <Select onValueChange={(e) => setType(e)}>
              <SelectTrigger>
                <SelectValue placeholder="provide info"></SelectValue>
              </SelectTrigger>
              <SelectContent>
                {
                  ["pending", "completed"].map((item, index) => {
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
            <Input type='date' {...register("startDate", {
              required: {
                value: true,
                message: "Start Date required"
              }, valueAsDate: true,
            })} />
            {errors["startDate"] && <FormError message={errors["startDate"].message} />}
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

export default EditCourse