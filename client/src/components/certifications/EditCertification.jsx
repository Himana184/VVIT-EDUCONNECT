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
import { updateCertification } from '@/redux/certificationSlice';

const EditCertification = ({ data }) => {
  const { isLoading } = useSelector((state) => state["certificate"])

  const [name, setName] = useState(data.name);


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
    data["name"] = name;
    
    const response = await dispatch(updateCertification({ data }))
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
          <DialogTitle>Edit certification details</DialogTitle>
        </DialogHeader>
        

        <form className='space-y-6' onSubmit={handleSubmit(handleAddCertification)}>
          <div className='space-y-2'>
            <Label>Name</Label>
            <Input 
              type="text"
              onValueChange={(e) => setName(e)}
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
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-4 shrink-0">
              <img id='preview_img' className="object-cover w-16 h-16 rounded-full" src="https://vconnectglobe.s3.ap-south-1.amazonaws.com/mentorimage.jpg" alt="User Image" />
              <label className="block ">
                <span className="sr-only">Choose photo</span>
                <input type="file" {...register("link", {
                  required: {
                    value: true,
                    message: "certificate is required"
                  }
                })} onChange={handlePhotoUpload} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 " />
              </label>
            </div>
            <div className="w-full">{errors["link"] && <FormError message={errors["link"].message} />}</div>
          </div>
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

export default EditCertification