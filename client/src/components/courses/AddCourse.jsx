/* eslint-disable no-unused-vars */
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogFooter, DialogDescription } from "../ui/dialog"
import { PiStack } from "react-icons/pi"
import { useForm } from "react-hook-form"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FormError } from "../common/FormError";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from 'react-redux';
import React from "react";

const AddCourse = () => {
  const dispatch = useDispatch();
  const form = useForm();

  const { isLoading } = useSelector((state) => state["course"]);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, formState, clearErrors, reset } = form;
  const { errors } = formState;

  // const handleAddCourse = async (data) => {
  //   console.log(data);
  // }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="space-x-2">
          <PiStack size={20} />
          <span>Add Course</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] max-h-[400px] lg:max-h-[600px] overflow-auto pb-10">
        <DialogHeader>
          <DialogTitle>
            Fill the details of the course
          </DialogTitle>
          <DialogDescription>
            Check the details before submitting
          </DialogDescription>
        </DialogHeader>
        <form className='space-y-6' onSubmit={handleSubmit(() => alert("submitted"))}>
          <div className='space-y-2'>
            <Label>Course Name</Label>
            <Input
              type="text"
              placeholder="Ex: Google Cloud Foundations" {...register("courseName", {
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
              placeholder="Ex: Coursera, Udemy" {...register("coursePlatform", {
                required: {
                  value: true,
                  message: "Course platform is required"
                }
              })} />
            {errors["coursePlatform"] && <FormError message={errors["coursePlatfrom"].message} />}
          </div>

          <div className="space-y-2">
            <Label>Completion Status</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Completion status"></SelectValue>
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

          <div className="flex w-full justify-between">
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

            <div className='space-y-3'>
              <Label>End Date</Label>
              <Input type='date' {...register("endDate", {
                valueAsDate: true,
              })} />
              {errors["endDate"] && <FormError message={errors["endDate"].message} />}
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full">
              {isLoading ? (
                <>
                  Adding course
                  <Loader2 className="w-4 h-4 ml-2 animate-spin font-semibold" />
                </>
              ) : (
                "Add course"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddCourse