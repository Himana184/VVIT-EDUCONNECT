/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DownloadCloud } from "lucide-react"
const AttachedFiles = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Attached Documents</CardTitle>
        <CardDescription>Download the files below and go through them carefully</CardDescription>
      </CardHeader>
      <CardContent className="flex space-x-5">
        {
          Array.from({ length: 4 }).map((item, index) => {
            return (
              <div key={index} className='border border-primary p-2 rounded-md'>
                <img src='https://data.unhcr.org/images/documents/big_441d7f43ead31df601a2dc864f5d8ec564d2e7ae.jpg' className='h-36 w-40' />
                <div className='ml-4 space-y-2'>
                  <p>{"Job Description"}</p>
                  <Button variant="outline" className="space-x-2">
                    <DownloadCloud size={20} />
                    <p>Download</p>
                  </Button>
                </div>
              </div>
            )
          })
        }
      </CardContent>
    </Card>
  )
}

export default AttachedFiles