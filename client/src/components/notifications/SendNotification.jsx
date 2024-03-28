/* eslint-disable react-hooks/exhaustive-deps */
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { FormError } from '../common/FormError';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Textarea } from '../ui/textarea';
import { TfiAnnouncement } from 'react-icons/tfi';
import { sendNotificationToStudents } from '@/redux/notificationSlice';


const SendNotification = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const form = useForm();
  const { register, handleSubmit, clearErrors, formState, reset } = form;
  const { errors } = formState;
  const { isLoading } = useSelector((state) => state["notification"]);

  const handleSendNotification = async (data) => {
    const response = await dispatch(sendNotificationToStudents(data));
    if (response.meta.requestStatus == "fulfilled") {
      setOpen(false);
      reset();
    }
  }
  useEffect(() => {
    clearErrors();
  }, [open])
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="space-x-2">
          <TfiAnnouncement size={20} />
          <span>Send Notification</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] max-h-[400px] lg:max-h-[600px] overflow-auto pb-10">
        <DialogHeader>
          <DialogTitle>
            Fill the details for sending notification
          </DialogTitle>
        </DialogHeader>
        <form className='space-y-6' onSubmit={handleSubmit(handleSendNotification)}>


          <div className='space-y-2'>
            <Label>Notification Title</Label>
            <Input
              type="text"
              placeholder="Ex: Exam Fee Payment" {...register("title", {
                required: {
                  value: true,
                  message: "Notification Title is required"
                }
              })} />
            {errors["title"] && <FormError message={errors["title"].message} />}
          </div>

          <div className='space-y-2'>
            <Label>Content</Label>
            <Textarea {...register("body", {
              required: {
                value: true,
                message: "Notification content is required"
              }
            })} />
            {errors["body"] && <FormError message={errors["body"].message} />}
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full">
              {isLoading ? (
                <>
                  sending Notification
                  <Loader2 className="w-4 h-4 ml-2 animate-spin font-semibold" />
                </>
              ) : (
                "Send Notification"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default SendNotification