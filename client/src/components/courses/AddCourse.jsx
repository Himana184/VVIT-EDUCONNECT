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
import { eligibleBranchesList } from "@/data/branches";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

const AddCourse = () => {
  const isLoading = false;
  // State to handle dialog open and close
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  //const [branches, setBranches] = useState([]);
  //react hook form
  const form = useForm();
  const { register, handleSubmit, formState, clearErrors, reset } = form;
  const { errors } = formState;

 

  //clear errors of the form based on the open and close of dialog
  useEffect(() => {
    clearErrors();
  }, [open])

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
        </DialogHeader>
        <form className='space-y-6' onSubmit={handleSubmit()}>
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
            <Input type='date' {...register("issueDate", {
              required: {
                value: true,
                message: "Start Date required"
              }, valueAsDate: true,
            })} />
            {errors["startDate"] && <FormError message={errors["startDate"].message} />}
          </div>

          

          <div>
            <label className="block ">
                <Label>Course Certificate</Label>
              <span className="sr-only">Upload certification</span>
              <Input type="file"
                {...register("link", {
                  required: {
                    value: true,
                    message: "Course certificate is required"
                  }
                })}
                className="block w-full text-sm text-slate-500 file:mr-4 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-primary hover:file:bg-primary hover:file:text-white file:cursor-pointer " />
            </label>
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full">
              {isLoading ? (
                <>
                  Adding announcement
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