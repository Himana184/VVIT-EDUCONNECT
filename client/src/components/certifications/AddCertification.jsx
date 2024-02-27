/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogFooter } from "../ui/dialog"
import { PiCertificateFill } from "react-icons/pi";
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
import { addCertification } from "@/redux/certificationSlice";
import React from "react";

const AddCertification = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state["certification"]);
  // State to handle dialog open and close
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  //const [branches, setBranches] = useState([]);
  //react hook form
  const form = useForm();
  const { register, handleSubmit, formState, clearErrors, reset } = form;
  const { errors } = formState;
  const certificationData = new FormData();
  const handleAddCertification = async (data) =>{
    data.name = name;
    for (let key in Object.keys(data.files)) {
      certificationData.append("files", data.files[key])
    }
    Object.keys(data).forEach((key) => {
      if (key !== "files") {
        certificationData.append(key, data[key]);
      }
    });
    const response = await dispatch(addCertification(certificationData));
      console.log("Response : ", response)
      setOpen(false);
  }
  const certificationsData = new FormData();

  //function to preview the image of the coordinator
  const handlePhotoUpload = (event) => {
    certificationsData.append('link', event.target.files[0])
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
          <PiCertificateFill size={20} />
          <span>Add certification</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] max-h-[400px] lg:max-h-[600px] overflow-auto pb-10">
        <DialogHeader>
          <DialogTitle>
            Fill the details of the certification
          </DialogTitle>
        </DialogHeader>
        <form className='space-y-6' onSubmit={handleSubmit(handleAddCertification)}>
          <div className='space-y-2'>
            <Label>Name</Label>
            <Input 
              type="text"
              onValueChange={(e) => setName(e)}
              placeholder="enter name of the certification" {...register("name", { 
                required: {

                  value: true,

                  message: "Certification name is required"
                }
              })} />
            {errors["name"] && <FormError message={errors["name"].message} />}
          </div>

          <div className='space-y-2'>
            <Label>Issuer</Label>
            <Input
              type="text"
              placeholder="enter name of the issuer" {...register("issuer", {
                required: {
                  value: true,
                  message: "Certification issuer is required"
                }
              })} />
            {errors["issuer"] && <FormError message={errors["issuer"].message} />}
          </div>

          <div className='space-y-2'>
            <Label>Certification ID</Label>
            <Input
              type="text"
              placeholder="id of certification"
              {...register("certificateId", {
                required: {
                  value: true,
                  message: "certification id is required"
                }
              })} />
            {errors["certificateId"] && <FormError message={errors["certificateId"].message} />}
          </div>

          <div className='space-y-3'>
            <Label>Issued Date</Label>
            <Input type='date' {...register("issueDate", {
              required: {
                value: true,
                message: "Issued Date required"
              }, valueAsDate: true,
            })} />
            {errors["issueDate"] && <FormError message={errors["issueDate"].message} />}
          </div>

          

          <div>
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-4 shrink-0">
              <img id='preview_img' className="object-cover w-16 h-16 rounded-full" src="https://vconnectglobe.s3.ap-south-1.amazonaws.com/mentorimage.jpg" alt="User Image" />
              <label className="block ">
                <span className="sr-only">Choose photo</span>
                <input type="file" {...register("link", {
                  required: {
                    value: true,
                    message: "certificate is required"
                  }
                })} onChange={handlePhotoUpload} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 " />
              </label>
            </div>
            <div className="w-full">{errors["link"] && <FormError message={errors["link"].message} />}</div>
          </div>
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full">
              {isLoading ? (
                <>
                  Adding announcement
                  <Loader2 className="w-4 h-4 ml-2 animate-spin font-semibold" />
                </>
              ) : (
                "Add certification"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddCertification