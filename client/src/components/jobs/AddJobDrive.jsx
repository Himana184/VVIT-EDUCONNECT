import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { FormError } from '../common/FormError'
import { TagsInput } from "react-tag-input-component";
import { MultiSelect } from "react-multi-select-component";
import { eligibleBranchesList } from '@/data/branches'
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from 'draft-convert';
import { EditorState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const jobCategories = [
  {
    label: "Internship",
    value: "Internship",
  },
  {
    label: "Full Time",
    value: "Full Time",
  },
  {
    label: "Internship + Full Time",
    value: "Internship + Full Time"
  }
];
const AddJobDrive = () => {

  // state to maintain close and open of dialog
  const [open, setOpen] = useState(false)
  const [eligibleBranches, setEligibleBranches] = useState([]);
  const [description, setDescription] = useState(
    () => EditorState.createEmpty())
  // roles offered by the company
  const [roles, setRoles] = useState([]);
  const [skills, setSkills] = useState([]);
  //selected job cateogories
  const [categories, setCategories] = useState([])
  //last date to apply
  console.log(roles)
  console.log(eligibleBranches)
  console.log(skills)
  console.log(categories)
  // react hook form
  const form = useForm()

  //destructure values from the react form
  const { register, handleSubmit, formState, clearErrors, reset } = form;

  //errors from the formstate
  const { errors } = formState;

  //function which handles job drive
  const handleAddJobDrive = async (data) => {
    // combine data from all the states in the form and print it 
    console.log("Job drive data:", data);
  }
  const [content, setContent] = useState("");
  useEffect(() => {
    let html = convertToHTML(description.getCurrentContent());
    setContent(html);
  }, [description]);
  useEffect(() => {
    clearErrors();
  }, [])
  console.log(content)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>
          Add Job Drive
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] lg:max-w-[50%] max-h-[400px] lg:max-h-[600px] overflow-auto pb-10">
        <DialogHeader>
          <DialogTitle>Enter job drive details</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleAddJobDrive)} className='space-y-6'>
          <div className='space-y-3'>
            <Label>Company name</Label>
            <Input
              type="text"
              placeholder="Accenture"
              {...register("companyName", {
                required: {
                  value: true,
                  message: "Company Name is required"
                }
              })}
            />
            {errors["companyName"] && <FormError message={errors["companyName"].message} />}
          </div>

          <div className='space-y-3'>
            <Label>Roles offered</Label>
            <TagsInput
              style={{ borderColor: "#ff5722" }}
              name='roles'
              placeHolder="Roles"
              value={roles}
              onChange={setRoles}
            />
          </div>

          <div className='space-y-3'>
            <Label>Category</Label>
            <MultiSelect
              options={jobCategories}
              value={categories}
              onChange={setCategories}
              labelledBy="Select"
            />
          </div>

          <div className='space-y-3'>
            <Label>Job Location</Label>
            <Input
              type="text"
              placeholder="Hyderabad, Remote"
              {...register("jobLocation", {
                required: {
                  value: true,
                  message: "Job Location is required"
                }
              })} />
          </div>



          <div className='space-y-3'>
            <Label>Last Date</Label>
            <Input type='date' {...register("lastDate", {
              required: {
                value: true,
                message: "Last date to apply is required"
              }, valueAsDate: true,
            })} />
            {errors["lastDate"] && <FormError message={errors["lastDate"].message} />}
          </div>

          <div className='space-y-3'>
            <Label>Salary Range</Label>
            <Input type='text'
              placeholder="4,00,000 to 8,00,000"
              {...register("salary", {
                required: {
                  value: true,
                  message: "Salary range is required"
                }
              })} />
            {errors["salary"] && <FormError message={errors["salary"].message} />}
          </div>

          <div className='space-y-3'>
            <Label>Skills required</Label>
            <TagsInput
              name='skillsRequired'
              placeHolder="Skills required"
              value={skills}
              onChange={setSkills}
            />
          </div>

          <div className='space-y-3'>
            <Label>Category</Label>
            <MultiSelect
              options={eligibleBranchesList}
              value={eligibleBranches}
              onChange={setEligibleBranches}
              labelledBy="Select"
            />
          </div>

          <div className='space-y-3 border border-primary p-1'>
            <Label>Description</Label>
            <Editor
              editorState={description}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={setDescription} />

            <textarea
              disabled
              value={content}
            />
          </div>

          <div className='space-y-3'>
            <Input type="file" multiple className="block w-full text-sm text-slate-500 file:mr-4  file:px-4 file:rounded-full file:border-0 file:text-sm file:cursor-pointer file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 " {...register("files")} />
          </div>

          <DialogFooter>
            <Button type="submit">Add Drive</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddJobDrive
