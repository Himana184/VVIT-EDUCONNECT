/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { FaRegUser } from "react-icons/fa";
import { useForm } from "react-hook-form"
import { FormError } from '../common/FormError';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { branches } from '@/data/branches';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { addUser } from '@/redux/userSlice';


const AddCoordinator = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state["user"]);

  // State to handle the open and close of dialog
  const [open, setOpen] = useState(false);

  // useState to store the department of the coordinator
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");

  //react hook form
  const form = useForm();

  //destructing required values from the form
  const { register, handleSubmit, clearErrors, reset, formState } = form;

  //errors from the form using formState
  const { errors } = formState;

  //function that handles the dispatch of coordinator add
  const handleAddCoordinator = async (data) => {
    if (department == "" || role == "") {
      toast.error("department and role are required");
      return;
    }
    data["branch"] = department
    data["role"] = role
    const userData = new FormData();
    userData.append("userImage", data.userImage[0])
    Object.keys(data).forEach((key) => {
      if (key !== "userImage") {
        userData.append(key, data[key]);
      }
    });

    const response = await dispatch(addUser(userData));
    setOpen(false)

  }

  //formdata instance containing the coordinator details
  const coordinatorData = new FormData();

  //function to preview the image of the coordinator
  const handlePhotoUpload = (event) => {
    coordinatorData.append('image', event.target.files[0])
    var output = document.getElementById('preview_img');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src) // free memory
    }
  }

  //clear errors and reset the form when the dialog is closed
  useEffect(() => {
    reset();
    clearErrors();
  }, [open])


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="space-x-2">
          <FaRegUser size={20} />
          <span>Add Coordinator</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] max-h-[400px] lg:max-h-[600px] overflow-auto pb-10">
        <DialogHeader>
          <DialogTitle>
            Fill the details of the user
          </DialogTitle>
        </DialogHeader>
        <form className='space-y-6' onSubmit={handleSubmit(handleAddCoordinator)}>
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-4 shrink-0">
              <img id='preview_img' className="object-cover w-16 h-16 rounded-full" src="https://vconnectglobe.s3.ap-south-1.amazonaws.com/mentorimage.jpg" alt="User Image" />
              <label className="block ">
                <span className="sr-only">Choose photo</span>
                <input type="file" {...register("userImage", {
                  required: {
                    value: true,
                    message: "user image is required"
                  }
                })} onChange={handlePhotoUpload} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 " />
              </label>
            </div>
            <div className="w-full">{errors["userImage"] && <FormError message={errors["userImage"].message} />}</div>
          </div>

          <div className='space-y-2'>
            <Label>Coordinator Name</Label>
            <Input
              type="text"
              placeholder="Mr. John Doe" {...register("name", {
                required: {
                  value: true,
                  message: "Coordinator name is required"
                }
              })} />
            {errors["name"] && <FormError message={errors["name"].message} />}
          </div>

          <div className='space-y-2'>
            <Label>Coordinator Email</Label>
            <Input
              type="text"
              placeholder="Johndoe@vvit.net"
              {...register("email", {
                required: {
                  value: true,
                  message: "Coordinator email is required"
                },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })} />
            {errors["email"] && <FormError message={errors["email"].message} />}
          </div>

          <div className='space-y-2'>
            <Label>Password</Label>
            <Input
              type="text"
              placeholder="******"
              {...register("password", {
                required: {
                  value: true,
                  message: "Coordinator password is required"
                }
              })} />
            {errors["password"] && <FormError message={errors["password"].message} />}
          </div>

          <div className='space-y-2'>
            <Label>Contact</Label>
            <Input
              type="text"
              placeholder="1234567890"
              {...register("contact", {
                required: {
                  value: true,
                  message: "Coordinator contact is required"
                },
                valueAsNumber: true,
                validate: {
                  isValid: (fieldValue) => {
                    return Number(fieldValue) || "Enter a valid number"
                  }
                }
              })} />
            {errors["contact"] && <FormError message={errors["contact"].message} />}
          </div>

          <div className='space-y-2'>
            <Label>Department</Label>
            <Select onValueChange={(e) => setDepartment(e)} required>
              <SelectTrigger>
                <SelectValue placeholder="Choose Department" />
              </SelectTrigger>
              <SelectContent>
                {
                  branches.map((branch, index) => (
                    <SelectItem value={branch} key={index}>{branch}</SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label>Role</Label>
            <Select onValueChange={(e) => setRole(e)} required>
              <SelectTrigger>
                <SelectValue placeholder="Choose role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"admin"}>{"Admin"}</SelectItem>
                <SelectItem value={"coordinator"}>{"Coordinator"}</SelectItem>
              </SelectContent>
            </Select>

          </div>

          <DialogFooter>
            <Button type="submit" className="w-full">
              {isLoading ? (
                <>
                  Adding {role}
                  <Loader2 className="w-4 h-4 ml-2 animate-spin font-semibold" />
                </>
              ) : (
                "Add user"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddCoordinator