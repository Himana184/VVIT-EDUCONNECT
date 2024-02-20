/* eslint-disable react/prop-types */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import OptedStudents from './OptedStudents'
import BasicDetails from './details/BasicDetails'
import DriveDescription from './details/DriveDescription'
import AttachedFiles from './details/AttachedFiles'

const JobDetail = ({ job }) => {
  return (
    <div className='space-y-6'>
      {/* Basic overview of details */}
      <BasicDetails job={job} />
      {/* Drive Description */}
      <DriveDescription job={job} />
      {/* Related files */}
      <AttachedFiles />
      {/* Opted students - only for admin */}
      <Card>
        <CardHeader>
          <CardTitle>Details of Opted Students</CardTitle>
          <CardDescription>Below are the students who have shown interest in the job drive</CardDescription>
        </CardHeader>
        <CardContent>
          <OptedStudents job={job} />
        </CardContent>
      </Card>
    </div>
  )
}

export default JobDetail