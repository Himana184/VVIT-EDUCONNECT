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

const EditCoordinator = ({ data }) => {
  const isLoading = false;

  const [department, setDepartment] = useState(data.department);

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
    console.log(data);
  }

  useEffect(() => {
    clearErrors();
  }, [open])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <PencilSquareIcon className="text-gray-700 cursor-pointer h-7 w-7 hover:text-primary" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] max-h-[400px] lg:max-h-[600px] overflow-auto pb-10">
        <DialogHeader className="mb-5">
          <DialogTitle>Edit coordinator details</DialogTitle>
        </DialogHeader>
        <form className='space-y-6' onSubmit={handleSubmit(handleEditDetails)}>

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
            <Label>Contact</Label>
            <Input
              type="text"
              placeholder="1234567890"
              {...register("contact", {
                required: {
                  value: true,
                  message: "Coordinator contact is required"
                }
              })} />
            {errors["contact"] && <FormError message={errors["contact"].message} />}
          </div>

          <div className='space-y-2'>
            <Label>Department</Label>
            <Select defaultValue={data.branch} onValueChange={(e) => setDepartment(e)}>
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
            {errors["branch"] && <FormError message={errors["branch"].message} />}
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

export default EditCoordinator