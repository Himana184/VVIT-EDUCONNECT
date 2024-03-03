import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { useRef, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { FormError } from '../common/FormError'
import { TagsInput } from "react-tag-input-component";
import { MultiSelect } from "react-multi-select-component";
import { eligibleBranchesList } from '@/data/branches'
import { useDispatch, useSelector } from 'react-redux'
import { handleAddJobDrive } from '@/redux/jobSlice'
import { Loader2 } from 'lucide-react'
import JoditEditor from 'jodit-react'
import { useNavigate } from 'react-router-dom'

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const { isLoading } = useSelector((state) => state["job"])
  const [eligibleBranches, setEligibleBranches] = useState([]);
  const [roles, setRoles] = useState([]);
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const form = useForm()

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const handleAddJob = async (data) => {
    data.roles = Object.values(roles);
    data.categories = categories.map((category) => {
      return category.value;
    })
    console.log(data.categories)
    data.skills = Object.values(skills);
    data.eligibleBranches = eligibleBranches.map((branch) => {
      return branch.value;
    })
    data.description = content;

    const jobData = new FormData();
    for (let key in Object.keys(data.files)) {
      jobData.append("files", data.files[key])
    }
    Object.keys(data).forEach((key) => {
      if (key !== "files") {
        jobData.append(key, data[key]);
      }
    });

    const response = await dispatch(handleAddJobDrive(jobData));
    console.log(response);
    if (response.meta.requestStatus == "fulfilled") {
      navigate("/admin/jobs", { replace: true });
    }
  }





  return (
    <div className=''>
      <div className='space-y-4'>
        <div>
          <h1 className='font-semibold text-xl text-center'>Enter job drive details</h1>
        </div>
        <form onSubmit={handleSubmit(handleAddJob)} className='gap-10 grid grid-cols-1 md:grid-cols-2 items-center justify-center'>
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
            <Label>Eligible Branches</Label>
            <MultiSelect
              options={eligibleBranchesList}
              value={eligibleBranches}
              onChange={setEligibleBranches}
              labelledBy="Select"
            />
          </div>

          <div className='space-y-3 border border-primary p-1 md:col-span-2'>
            <Label>Description</Label>
            <JoditEditor
              ref={editor}
              value={content}
              tabIndex={1} // tabIndex of textarea
              onBlur={newContent => setContent(newContent)}
            />


          </div>

          <div className='space-y-3 md:col-span-2'>
            <Input type="file" multiple className="block w-full text-sm text-slate-500 file:mr-4  file:px-4 file:rounded-full file:border-0 file:text-sm file:cursor-pointer file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 " {...register("files")} />
          </div>

          <div className='justify-self-center md:col-span-2'>
            <Button type="submit" className="w-fit">
              {isLoading ? (
                <>
                  Adding job drive
                  <Loader2 className="w-4 h-4 ml-2 animate-spin font-semibold" />
                </>
              ) : (
                "Add Job Drive"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddJobDrive
