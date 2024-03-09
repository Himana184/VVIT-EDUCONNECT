/* eslint-disable react/prop-types */
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { branches } from '@/data/branches'
import { Button } from '../ui/button'
import { CloudArrowDownIcon } from '@heroicons/react/24/outline'
import { Delete, Download, PenBoxIcon, Trash2Icon } from 'lucide-react'
import HTMLReactParser from 'html-react-parser'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAnnouncement, setAnnouncement } from '@/redux/adminAnnouncementSlice'
import { Link } from 'react-router-dom'

const AnnouncementCard = ({ announcement }) => {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state["auth"])
  return (
    <Card className="max-w-md ">
      <CardHeader className="flex justify-between flex-row">
        <div className='space-y-2'>
          <CardTitle>
            {announcement?.title || "MERN Stack Webinar"}
          </CardTitle>
          <CardDescription>
            {/* posted on {announcement?.createdAt || "02-01-2024"} */}
            {announcement?.category || "Exams"}
          </CardDescription>
        </div>
        <div>
          {
            announcement?.priority == "High" ? <Badge variant={"secondary"} className={"bg-primary text-white"}>{announcement?.priority}</Badge> : <Badge variant={"secondary"} className={"text-white"}>{announcement?.priority || "Moderate"}</Badge>
          }

        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className=' h-40 overflow-auto'>{HTMLReactParser(announcement?.description + "")}</p>
        <div className='flex gap-2 flex-wrap'>
          {
            announcement?.branches?.[0].split(",")?.map((branch, index) => {
              return (
                <Badge variant={"outline"} key={index} className={"w-max"}>{branch}</Badge>
              )
            })
          }
        </div>
      </CardContent>
      <CardFooter className="w-full flex justify-between items-center">
        {/* If file exists there will be download button */}
        <a href={announcement?.file || "https://storage.googleapis.com/educonnect-testing-1/logo.png"} target='_blank' rel="noreferrer">
          <Button variant="outline" className="border-primary/50 space-x-2 flex items-center">
            <Download />
            <p>Download</p>
          </Button>
        </a>

        {/* Edit and delete options for admin */}
        {
          role === "admin" && <div className='flex items-center justify-between space-x-4'>
            <Link to={"/admin/editAnnouncement"}>
              <PenBoxIcon className='cursor-pointer' onClick={() => dispatch(setAnnouncement({ announcement }))} />
            </Link>
            <Trash2Icon className='text-primary hover:text-red-500 hover:scale-105 transition-all duration-200 cursor-pointer'
              onClick={() => dispatch(deleteAnnouncement({ _id: announcement._id }))} />
          </div>
        }
      </CardFooter>
    </Card>
  )
}

export default AnnouncementCard