/* eslint-disable react/prop-types */
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { branches } from "@/data/branches"
import HTMLReactParser from "html-react-parser"

const DriveDescription = ({ job }) => {
  return (
    <Card>
      <CardHeader className="space-y-4">
        <CardTitle>{"Drive Description"}</CardTitle>
        <CardDescription className="text-black overflow-auto h-[300px]">
          {
            HTMLReactParser(job?.description || "<p>Loading</p>")
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex items-center space-x-4'>
          <div className='flex flex-wrap gap-2'>
            {
              branches.map((branch, index) => {
                return (
                  <Badge key={index} variant={"outline"}>{branch}</Badge>
                )
              })
            }
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default DriveDescription