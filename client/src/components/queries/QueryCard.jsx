import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { branches } from '@/data/branches'
import { Button } from '../ui/button'
import { CloudArrowDownIcon } from '@heroicons/react/24/outline'
import { Delete, Download, PenBoxIcon, Trash2Icon } from 'lucide-react'

const QueryCard = ({ query }) => {
  return (
    <Card className="max-w-md ">
      <CardHeader className="flex justify-between flex-row">
        <div className='space-y-2'>
          <CardTitle>
            {query?.title || "Student Clubs"}
          </CardTitle>
          <CardDescription>
            {/* posted on {announcement?.createdAt || "02-01-2024"} */}
            {query?.category || "Culturals"}
          </CardDescription>
        </div>
        <div>
          <Badge variant={"secondary"} className={"text-white"}>{query?.status || "Pending"}</Badge>
        </div>
        
      </CardHeader>
      <CardContent className="space-y-6">
        <p className=' h-32 overflow-auto'>{query?.description || "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore rerum nam repudiandae accusamus quam magni sequi eos omnis voluptatum ea voluptatibus, tempore sit est numquam minus doloremque itaque, commodi totam? Labore rerum nam repudiandae accusamus quam magni sequi eos omnis voluptatum ea voluptatibus, tempore sit est numquam minus doloremque itaque, commodi totam?"}</p>
        <Badge>
        <p className='block h-6 overflow-auto '>{query?.comments || "No comments "}</p>
        </Badge>
        
      </CardContent>
      <CardFooter className="w-full flex justify-between items-center">
        {/* If file exists there will be download button */}
        <Button variant="outline" className="border-primary/50 space-x-2 flex items-center">
          <Download />
          <p>Download</p>
        </Button>

        {/* Edit and delete options for admin */}
        <div className='flex items-center justify-between space-x-4'>
          <PenBoxIcon className='cursor-pointer' />
          <Trash2Icon className='text-primary hover:text-red-500 hover:scale-105 transition-all duration-200 cursor-pointer' />
        </div>

      </CardFooter>
    </Card>
  )
}

export default QueryCard