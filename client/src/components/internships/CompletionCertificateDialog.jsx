/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Upload } from 'lucide-react'
import { useEffect, useState } from 'react';
import { Label } from '../ui/label';
import { FormError } from '../common/FormError';
import { Button } from '../ui/button';
import { useDispatch } from 'react-redux';
import { uploadCompletionCertificate } from '@/redux/internshipSlice';

const CompletionCertificateDialog = ({ internship }) => {
  const dispatch = useDispatch();
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const [open, setOpen] = useState(false)
  useEffect(() => {

  }, [open])

  const handleUpload = async (data) => {

    const completionCertificateData = new FormData();

    completionCertificateData.append("completionCertificate", data.completionCertificate[0])
    completionCertificateData.append("internshipId", internship._id);

    const response = await dispatch(uploadCompletionCertificate(completionCertificateData));
    console.log(response);
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Upload />
      </DialogTrigger>

      <DialogContent className="sm:max-w-[450px] max-h-[400px] lg:max-h-[600px] overflow-auto pb-10 space-y-6">
        <DialogHeader>
          <DialogTitle>Internship Completion Certificate Upload</DialogTitle>
          <DialogDescription>{`Upload the internship certificate for the role of ${internship.role} at ${internship.companyName}`}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleUpload)} className='space-y-4'>
          <div className="flex flex-col space-y-3 shrink-0">
            <Label>Completion Certificate</Label>
            <input type="file" {...register("completionCertificate", {
              required: {
                value: true,
                message: "Completion certificate is required"
              }
            })} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 " />
          </div>
          <div className="w-full">{errors["completionCertificate"] && <FormError message={errors["completionCertificate"].message} />}</div>
          <div className=" w-full justify-end flex">
            <Button type="submit">
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CompletionCertificateDialog