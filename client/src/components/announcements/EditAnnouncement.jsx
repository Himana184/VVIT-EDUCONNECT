/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { useForm } from "react-hook-form"
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { FormError } from '../common/FormError';
import { Select } from '@radix-ui/react-select';
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { branches } from '@/data/branches';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAnnouncement } from '@/redux/adminAnnouncementSlice';

const EditAnnouncement = ({ data }) => {
  const { isLoading } = useSelector((state) => state["user"])
  const [priority, setPriority] = useState(data.priority);
  //const [category, setCategory] = useState(data.category);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  //react hook form
  const form = useForm({
    defaultValues: { ...data }
  });

  //destructure the values from the form
  const { register, handleSubmit, clearErrors, reset, formState } = form;

  //errros from the formstate
  const { errors } = formState;

  //function that will dispatch the edit details
  const handleEditDetails = async (data) => {
    data["priority"] = priority;
    //data["category"] = category;
    const response = await dispatch(updateAnnouncement({ data }))
    setOpen(false);

  }

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
          <DialogTitle>Edit announcement details</DialogTitle>
        </DialogHeader>
        <form className='space-y-6' onSubmit={handleSubmit(handleEditDetails)}>

        <div className='space-y-2'>
            <Label>Title</Label>
            <Input
              type="text"
              placeholder="Webinar announcement" {...register("title", {
                required: {
                  value: true,
                  message: "Announcement title is required"
                }
              })} />
            {errors["title"] && <FormError message={errors["title"].message} />}
          </div>

          <div className='space-y-2'>
            <Label>Description</Label>
            <Textarea
              type="text"
              placeholder="Details of webinar"
              {...register("description", {
                required: {
                  value: true,
                  message: "Announcement description is required"
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
                  message: "Announcement category is required"
                }
              })} />
            {errors["category"] && <FormError message={errors["category"].message} />}
          </div>

          <div className='space-y-2'>
            <Label>Branches</Label>
            <MultiSelect
              options={eligibleBranchesList}
              value={branches}
              onChange={setBranches}
              labelledBy="Select"
            />
          </div>

          <div className="space-y-2">
            <Label>Priority</Label>
            <Select defaultValue={data.branch} onValueChange={(e) => setPriority(e)} required>
              <SelectTrigger>
                <SelectValue placeholder="Select announcement priority"></SelectValue>
              </SelectTrigger>
              <SelectContent>
                {
                  ["High", "Moderate", "Low"].map((item, index) => {
                    return (
                      <SelectItem value={item} key={index}>{item}</SelectItem>
                    )
                  })
                }
              </SelectContent>
            </Select>
          </div>

          <div>
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
export default EditAnnouncement