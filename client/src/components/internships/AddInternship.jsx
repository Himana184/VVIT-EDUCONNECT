/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogFooter, DialogDescription } from "../ui/dialog"
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
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { addInternship } from "@/redux/internshipSlice";
import { internshipType } from "@/utils/internship";

const AddInternship = () => {
  const dispatch = useDispatch();
  const form = useForm();

  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");

  const { isLoading } = useSelector((state) => state["internship"]);
  const { register, handleSubmit, formState, clearErrors, reset } = form;
  const { errors } = formState;

  const handleAddInternship = async (data) => {

    const internshipData = new FormData();
    data.internshipType = type;

    internshipData.append("offerLetter", data.offerLetter[0])
    Object.keys(data).forEach((key) => {
      if (key !== "offerLetter") {
        internshipData.append(key, data[key]);
      }
    });

    const response = await dispatch(addInternship(internshipData));
    setOpen(false)
  }

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
          <DialogDescription>
            Check the details before submitting
          </DialogDescription>
        </DialogHeader>

        <form className='space-y-6' onSubmit={handleSubmit(handleAddInternship)}>
          <div className='space-y-2'>
            <Label>Company Name</Label>
            <Input
              type="text"
              placeholder="Ex: Amazon" {...register("companyName", {
                required: {
                  value: true,
                  message: "Company name is required"
                }
              })} onValueChange={(e) => setName(e)} />
            {errors["companyName"] && <FormError message={errors["companyName"].message} />}
          </div>

          <div className='space-y-2'>
            <Label>Internship Domain</Label>
            <Input
              type="text"
              placeholder="Ex: Software Development / Marketing" {...register("internshipDomain", {
                required: {
                  value: true,
                  message: "internship domain is required"
                }
              })} />
            {errors["internshipDomain"] && <FormError message={errors["internshipDomain"].message} />}
          </div>

          <div className='space-y-2'>
            <Label>Role</Label>
            <Input
              type="text"
              placeholder="Ex: QA / SDE"
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
              type="text"
              placeholder="Ex: 15,000"
              {...register("stipend", {
                required: {
                  value: true,
                  message: "stipend is required"
                },
                validate: {
                  isValidNumber: (fieldValue) => {
                    return Number(fieldValue) || "Enter a valid stipend amount"
                  }
                }
              })} />
            {errors["stipend"] && <FormError message={errors["stipend"].message} />}
          </div>



          <div className="space-y-2">
            <Label>Internship Type</Label>
            <Select onValueChange={(e) => setType(e)} required>
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
              <Input datepicker type='date' {...register("endDate", {
                required: {
                  value: true,
                  message: "End Date required"
                }, valueAsDate: true,
              })} />
              {errors["endDate"] && <FormError message={errors["endDate"].message} />}
            </div>
          </div>

          <div className="flex flex-col space-y-3 shrink-0">
            <Label>Certificate</Label>
            <input type="file" {...register("offerLetter", {
              required: {
                value: true,
                message: "offer letter is required"
              }
            })} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 " />
          </div>
          <div className="w-full">{errors["offerLetter"] && <FormError message={errors["offerLetter"].message} />}</div>

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