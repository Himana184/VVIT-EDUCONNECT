/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react"
import { TfiAnnouncement } from "react-icons/tfi";
import { useForm } from "react-hook-form"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FormError } from "../common/FormError";
import { MultiSelect } from "react-multi-select-component";
import { eligibleBranchesList } from "@/data/branches";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from 'react-redux';
import JoditEditor from 'jodit-react';
import { addAnnouncement } from "@/redux/adminAnnouncementSlice";
import { useNavigate } from "react-router-dom";

const AddAnnouncement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useForm();
  const editor = useRef(null);

  const [branches, setBranches] = useState([]);
  const [priority, setPriority] = useState("");
  const [content, setContent] = useState('');

  const { isLoading } = useSelector((state) => state["announcement"])
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, formState, clearErrors, reset } = form;
  const { errors } = formState;
  const selectedBranches = branches.map((branch) => {
    return branch.value;
  })
  const handleAddAnnouncement = async (data) => {
    const announcementData = new FormData();
    announcementData.append("announcementFile", data.files[0]);
    data.branches = selectedBranches;
    data.priority = priority;
    data.description = content;
    Object.keys(data).forEach((key) => {
      if (key !== "files") {
        announcementData.append(key, data[key]);
      }
    });

    const response = await dispatch(addAnnouncement(announcementData));
    if (response.meta.requestStatus == "fulfilled") {
      navigate("/admin/announcements");
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className=" max-w-xl">
        <div>
          <h1 className="font-semibold text-lg text-center">
            Fill the details of the announcement
          </h1>
        </div>
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
            <JoditEditor
              ref={editor}
              value={content}
              tabIndex={1} // tabIndex of textarea
              onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            // onChange={newContent => setContent(newContent)}
            />
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

          <div>
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
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddAnnouncement