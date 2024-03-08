/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DownloadCloud } from "lucide-react"
import { useSelector } from "react-redux"
const AttachedFiles = ({ job }) => {
  
  return (
    <Card >
      <CardHeader>
        <CardTitle>Attached Documents</CardTitle>
        <CardDescription>Download the files below and go through them carefully</CardDescription>
      </CardHeader>
      <CardContent className="flex space-x-5 overflow-auto">
        {
          job?.files?.map((item, index) => {
            return (
              <a key={index} href={item} target="_blank" rel="noreferrer" className='border border-primary p-2 rounded-md cursor-pointer'>
                <img src='https://data.unhcr.org/images/documents/big_441d7f43ead31df601a2dc864f5d8ec564d2e7ae.jpg' className='h-36 w-40' />

                <Button variant="outline" className="w-full">
                  <a href={item} target="_blank" rel="noreferrer" className="flex space-x-2">
                    <DownloadCloud size={20} />
                    <p>Download</p>
                  </a>
                </Button>

              </a>
            )
          })
        }
      </CardContent>
    </Card>
  )
}

export default AttachedFiles