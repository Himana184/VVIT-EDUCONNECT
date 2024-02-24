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

const AddCertification = () => {
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
        <form className='space-y-6' onSubmit={handleSubmit()}>
          <div className='space-y-2'>
            <Label>Name</Label>
            <Input
              type="text"
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
            <label className="block ">
              <span className="sr-only">Upload certification</span>
              <Input type="file"
                {...register("link", {
                  required: {
                    value: true,
                    message: "Certification image is required"
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