import { Briefcase, FolderKanban, Globe } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { PiStack } from 'react-icons/pi'
import { useSelector } from 'react-redux'
import { Table, TableBody, TableCell, TableHead, TableRow } from '../ui/table'

const StudentStatistics = () => {
  const { student } = useSelector((state) => state["student"]);
  return (
    <div className="flex gap-10 overflow-auto">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Internships
          </CardTitle>
          <FolderKanban />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{student?.internshipsCount}</div>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            OptedJobs
          </CardTitle>
          <Briefcase />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{student?.optedJobsCount}</div>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Courses
          </CardTitle>
          <PiStack size={20} className='text-semibold' />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{student?.coursesCount}</div>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Certifications
          </CardTitle>
          <Globe />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{student?.certificationsCount}</div>
        </CardContent>
      </Card>

    </div>
  )
}

const StudentDetails = () => {
  const { student } = useSelector((state) => state["student"]);
  return (
    <div className='space-y-6'>
      <StudentStatistics />
      <Card className="w-fit h-96 overflow-auto">
        <CardHeader>
          <CardTitle>
            Student Details
          </CardTitle>
          <CardDescription>
            Below are the basic details of the student
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableHead className="text-black">Name</TableHead>
                <TableCell>{student?.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="text-black">Branch</TableHead>
                <TableCell>{student?.branch}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="text-black">Section</TableHead>
                <TableCell>{student?.section}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="text-black">Passout Year</TableHead>
                <TableCell>{student?.passoutYear}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="text-black">Roll Number</TableHead>
                <TableCell>{student?.rollNumber}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="text-black">College Mail</TableHead>
                <TableCell>
                  <a href={`mailto:${student?.collegeMail}`}>{student?.collegeMail}</a>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="text-black">Contact</TableHead>
                <TableCell>{student?.contact}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="text-black">Personal Email</TableHead>
                <TableCell>
                  <a href={`mailto:${student?.personalMail}`}>{student?.personalMail}</a>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default StudentDetails