/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogFooter } from "../ui/dialog"
import { MdOutlineHelp } from "react-icons/md";
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

const AddQuery = () => {
  const isLoading = false;
  // State to handle dialog open and close
  const [open, setOpen] = useState(false);


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
          <MdOutlineHelp size={20} />
          <span>Add Query</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] max-h-[400px] lg:max-h-[600px] overflow-auto pb-10">
        <DialogHeader>
          <DialogTitle>
            Fill the details of the query
          </DialogTitle>
        </DialogHeader>
        <form className='space-y-6' onSubmit={handleSubmit()}>
          <div className='space-y-2'>
            <Label>Title</Label>
            <Input
              type="text"
              placeholder="title of your query" {...register("title", {
                required: {
                  value: true,
                  message: "title is required"
                }
              })} />
            {errors["title"] && <FormError message={errors["title"].message} />}
          </div>

          <div className='space-y-2'>
            <Label>Description</Label>
            <Textarea
              type="text"
              placeholder="Details of query"
              {...register("description", {
                required: {
                  value: true,
                  message: "description is required"
                },
              })} />
            {errors["description"] && <FormError message={errors["description"].message} />}
          </div>

          <div className='space-y-2'>
            <Label>Category</Label>
            <Input
              type="text"
              placeholder="Exams, Webinars, Events"
              {...register("category", {
                required: {
                  value: true,
                  message: "Query category is required"
                }
              })} />
            {errors["category"] && <FormError message={errors["category"].message} />}
          </div>

          <div className='space-y-2'>
            <Label>Branch</Label>
            <Input
              type="text"
              placeholder="branch of your education"
              {...register("branch", {
                required: {
                  value: true,
                  message: "branch is required"
                }
              })} />
            {errors["branch"] && <FormError message={errors["branch"].message} />}
          </div>

          <div className='space-y-2'>
            <Label>Comments</Label>
            <Input
              type="text"
              placeholder="comments if any"
              {...register("category", {})} />
            {errors["comments"] && <FormError message={errors["comments"].message} />}
          </div>

          <div>
            <Label>Upload any documents</Label>
            <label className="block ">
              <span className="sr-only">Choose photo</span>
              <Input type="file"
                {...register("file", {})}
                className="block w-full text-sm text-slate-500 file:mr-4 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-primary hover:file:bg-primary hover:file:text-white file:cursor-pointer " />
            </label>
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full">
              {isLoading ? (
                <>
                  Adding query
                  <Loader2 className="w-4 h-4 ml-2 animate-spin font-semibold" />
                </>
              ) : (
                "Add query"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddQuery