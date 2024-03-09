import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { branches } from '@/data/branches'
import { Button } from '@/components/ui/button'
import { CloudArrowDownIcon } from '@heroicons/react/24/outline'
import { Delete, Download, PenBoxIcon, Trash2Icon } from 'lucide-react'
import DeleteDialog from "@/components/common/DeleteDialog";
import EditAnnouncement from "@/components/announcements/EditAnnouncement";
import { Switch } from "@/components/ui/switch";
import { deleteAnnouncement } from "@/redux/announcementSlice";
import { useDispatch } from "react-redux";

const announcementCard = ({ announcement }) => {
  return (
    <Card className="max-w-md ">
      <CardHeader className="flex justify-between flex-row">
        <div className='space-y-2'>
          <CardTitle>
            {announcement?.title}
          </CardTitle>
          <CardDescription>
            {/* posted on {announcement?.createdAt || "02-01-2024"} */}
            {announcement?.category}
          </CardDescription>
        </div>
        <div>
          <Badge variant={"secondary"} className={"text-white"}>{announcement?.priority}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className=' h-32 overflow-auto'>{announcement?.description}</p>
        <div className='flex space-x-2 flex-wrap'>
          {
            branches.slice(0, 5).map((branch, index) => {
              return (
                <Badge key={index} variant={"outline"}>{branch}</Badge>
              )
            })
          }
        </div>
      </CardContent>
      <CardFooter className="w-full flex justify-between items-center">
        {/* If file exists there will be download button */}
        <Button variant="outline" className="border-primary/50 space-x-2 flex items-center">
          <Download />
          <p>Download</p>
        </Button>

        {/* Edit and delete options for admin */}
        <div className='flex items-center justify-between space-x-4'>
          <PenBoxIcon className="cursor-pointer" onClick={EditAnnouncement(announcement)} />
          <Trash2Icon className='text-primary hover:text-red-500 hover:scale-105 transition-all duration-200 cursor-pointer' onClick={<DeleteDialog dialogDescription={
            "This action is irreversible click delete to delete the details permanently"
          }
            handleDelete={deleteAnnouncement} />} />
        </div>

      </CardFooter>
    </Card>
  )
}

export default announcementCard
