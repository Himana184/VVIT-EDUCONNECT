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
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
//import { addCertification } from "@/redux/certificationSlice";
import React from "react";
import { addCourse } from "@/redux/courseSlice";

const AddCourse = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state["course"]);
  // State to handle dialog open and close
  const [open, setOpen] = useState(false);

  const [courseName, setName] = useState("");
  //const [branches, setBranches] = useState([]);
  //react hook form
  const form = useForm();
  const { register, handleSubmit, formState, clearErrors, reset } = form;
  const { errors } = formState;
  const handleAddCourse = async (data) => {
    if (courseName == "") {
      toast.error("course name required");
      return;
    }
    data["courseName"]=courseName;
    const courseData = new FormData();
    courseData.append("certificate", data.userImage[0])
    Object.keys(data).forEach((key) => {
      if (key !== "userImage") {
        userData.append(key, data[key]);
      }
    });

    const response = await dispatch(addCourse(courseData));
    setOpen(false)

  }

  //formdata instance containing the coordinator details
  const coursesData = new FormData();

  //function to preview the image of the coordinator
  const handlePhotoUpload = (event) => {
    coursesData.append('certificate', event.target.files[0])
    var output = document.getElementById('preview_img');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src) // free memory
    }
  }

 

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
        <form className='space-y-6' onSubmit={handleSubmit(handleAddCourse)}>
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

          

          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-4 shrink-0">
              <img id='preview_img' className="object-cover w-16 h-16 rounded-full" src="https://vconnectglobe.s3.ap-south-1.amazonaws.com/mentorimage.jpg" alt="User Image" />
              <label className="block ">
                <span className="sr-only">Choose photo</span>
                <input type="file" {...register("certificate", {
                  required: {
                    value: true,
                    message: "course certificate is required"
                  }
                })} onChange={handlePhotoUpload} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 " />
              </label>
            </div>
            <div className="w-full">{errors["certificate"] && <FormError message={errors["certificate"].message} />}</div>
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