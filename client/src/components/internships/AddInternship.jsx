/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogFooter } from "../ui/dialog"
import { FolderKanban } from "lucide-react";
import { useForm } from "react-hook-form"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FormError } from "../common/FormError";
import { Textarea } from "../ui/textarea";
import { MultiSelect } from "react-multi-select-component";
//import { internshipType } from "@/data/internshiptypes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

const AddInternship = () => {
  const isLoading = false;
  // State to handle dialog open and close
  const [open, setOpen] = useState(false);

  //const [priority, setPriority] = useState("");
  const [internshipType, setType] = useState([]);
  //react hook form
  const form = useForm();
  const { register, handleSubmit, formState, clearErrors, reset } = form;
  const { errors } = formState;
  const handleAddInternship = async (data) => {
    data.internshipType = internshipType;
    
    console.log("internship Data: ", data);
  }


  

  //clear errors of the form based on the open and close of dialog
  useEffect(() => {
    clearErrors();
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="space-x-2">
          <FolderKanban size={20} />
          <span>Add Internship</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] max-h-[400px] lg:max-h-[600px] overflow-auto pb-10">
        <DialogHeader>
          <DialogTitle>
            Fill the details of the internship
          </DialogTitle>
        </DialogHeader>
        <form className='space-y-6' onSubmit={handleSubmit(handleAddInternship)}>
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
            <Select onValueChange={(e) => setType(e)}>
              <SelectTrigger>
                <SelectValue placeholder="Select internship type"></SelectValue>
              </SelectTrigger>
              <SelectContent>
                {
                  ["remote", "hybrid", "on-site"].map((item, index) => {
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
          <div className='space-y-3'>
            <Label>End Date</Label>
            <Input type='date' {...register("endDate", {
              required: {
                value: true,
                message: "End Date required"
              }, valueAsDate: true,
            })} />
            {errors["endDate"] && <FormError message={errors["endDate"].message} />}
          </div>

          <div>
            <label className="block ">
              <Label>Offer Letter</Label>
              <span className="sr-only">Choose document</span>
              <Input type="file"
                     
                {...register("offerLetter", {
                  required: {
                    value: true,
                    message: "offer letter is required"
                  }
                })}
                className="block w-full text-sm text-slate-500 file:mr-4 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-primary hover:file:bg-primary hover:file:text-white file:cursor-pointer " />
            </label>
          </div>
          <div>
            <label className="block ">
              <Label>Completion Certificate</Label>
              <span className="sr-only">Choose document</span>

              <Input type="file"
                     
                {...register("completionCertificate", {
                  required: {
                    value: true,
                    message: "completion certificate is required"
                  }
                })}
                className="block w-full text-sm text-slate-500 file:mr-4 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-primary hover:file:bg-primary hover:file:text-white file:cursor-pointer " />
            </label>
          </div>
          

          <DialogFooter>
            <Button type="submit" className="w-full">
              {isLoading ? (
                <>
                  Adding internship
                  <Loader2 className="w-4 h-4 ml-2 animate-spin font-semibold" />
                </>
              ) : (
                "Add Internship"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddInternship