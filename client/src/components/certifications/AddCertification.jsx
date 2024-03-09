/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogFooter, DialogDescription } from "../ui/dialog"
import { PiCertificateFill } from "react-icons/pi";
import { useForm } from "react-hook-form"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FormError } from "../common/FormError";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from 'react-redux';
import { addCertification } from "@/redux/certificationSlice";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar"
import { TagsInput } from "react-tag-input-component";

const AddCertification = () => {
  // Hooks
  const dispatch = useDispatch();
  const form = useForm();
  // State
  const [open, setOpen] = useState(false);
  const [certificationTags, setCertificationTags] = useState([])
  const [date, setDate] = useState("");

  const { isLoading } = useSelector((state) => state["certification"]);
  const { register, handleSubmit, formState, clearErrors, reset } = form;
  const { errors } = formState;

  console.log(errors)


  const handleAddCertification = async (data) => {

    const certificationData = new FormData();
    data.tags = Object.values(certificationTags);
    console.log(data.tags);
    data.issueDate = date;
    Object.keys(data).forEach((key) => {
      if (key !== "file") {
        certificationData.append(key, data[key]);
      }
    });
    certificationData.append("certification-file", data.file[0])

    const response = await dispatch(addCertification(certificationData));
    setOpen(false);
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
          <DialogDescription>
            Ensure only certification details are filled here
          </DialogDescription>
        </DialogHeader>
        <form className='space-y-6' onSubmit={handleSubmit(handleAddCertification)}>
          <div className='space-y-2'>
            <Label>Certification Name</Label>
            <Input
              type="text"
              placeholder="Ex: Google Cloud Digital Leader" {...register("name", {
                required: {
                  value: true,
                  message: "Certification name is required"
                }
              })} />
            {errors["name"] && <FormError message={errors["name"].message} />}
          </div>

          <div className='space-y-2'>
            <Label>Certification Issuer</Label>
            <Input
              type="text"
              placeholder="Ex: Google, Amazon" {...register("issuer", {
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
              placeholder="Ex: GCPW1231230"
              {...register("certificateId", {
                required: {
                  value: true,
                  message: "certification id is required"
                }
              })} />
            {errors["certificateId"] && <FormError message={errors["certificateId"].message} />}
          </div>

          <div className='flex flex-col space-y-3'>
            <Label>Issued Date</Label>
            <Popover className="block">
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal border-primary",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto overflow-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors["issueDate"] && <FormError message={errors["issueDate"].message} />}
          </div>
          <div className="space-y-2">
            <Label>Tags</Label>
            <TagsInput style={{ borderColor: "#ff5722" }}
              name='certificationTags'
              placeHolder="Certification Tags"
              value={certificationTags}
              onChange={setCertificationTags} />
          </div>


          <div className="flex flex-col space-y-3 shrink-0 ">
            <Label>Upload Certificate</Label>
            <label className="block ">
              <input type="file" {...register("file", {
                required: {
                  value: true,
                  message: "certificate is required"
                }
              })} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 " />
            </label>
          </div>
          <div className="w-full">{errors["file"] && <FormError message={errors["file"].message} />}</div>

          <DialogFooter>
            <Button type="submit" className="w-full">
              {isLoading ? (
                <>
                  Adding certification
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