/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogFooter } from "../ui/dialog"
import { TfiAnnouncement } from "react-icons/tfi";
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
import { addAnnouncement } from "@/redux/adminAnnouncementSlice";
import { Editor, EditorState } from "react-draft-wysiwyg"
const AddAnnouncement = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state["announcement"]);
  // const isLoading = false;
  // State to handle dialog open and close
  const [open, setOpen] = useState(false);

  const [branches, setBranches] = useState([]);
  const [description, setDescription] = useState(
    () => "")
  //react hook form
  const form = useForm();
  const { register, handleSubmit, formState, clearErrors, reset } = form;
  const { errors } = formState;

  const handleAddAnnouncement = async (data) => {
    data.branches = JSON.parse(JSON.stringify(branches));
    data.description = description

    const announcementData = new FormData();
    for (let key in Object.keys(data.files)) {
      announcementData.append("files", data.files[key])
    }
    Object.keys(data).forEach((key) => {
      if (key !== "files") {
        jobData.append(key, data[key]);
      }
    });
    const response = await dispatch(addAnnouncement(announcementData));
    console.log("Response : ", response)
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
          <TfiAnnouncement size={20} />
          <span>Add Announcement</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] max-h-[400px] lg:max-h-[600px] overflow-auto pb-10">
        <DialogHeader>
          <DialogTitle>
            Fill the details of the announcement
          </DialogTitle>
        </DialogHeader>
        <form className='space-y-6' onSubmit={handleSubmit(handleAddAnnouncement)}>
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

          <div className='space-y-2 border border-primary/50 p-1'>
            <Label>Description</Label>
            <Editor
              editorState={description}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={setDescription} />
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
            <Select onValueChange={(e) => setPriority(e)}>
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
                {...register("files", {
                  required: {
                    value: true,
                    message: "Coordinator image is required"
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
                "Add announcement"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddAnnouncement