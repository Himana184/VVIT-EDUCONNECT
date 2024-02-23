import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { branches } from "@/data/branches"

const DriveDescription = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{"Drive Description"}</CardTitle>
        <CardDescription>Find more details about the drive below</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex items-center space-x-4'>
          <Label>Eligible Branches</Label>
          <div className='space-x-2'>
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