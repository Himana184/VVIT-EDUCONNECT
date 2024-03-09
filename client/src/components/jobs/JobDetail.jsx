/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import OptedStudents from './OptedStudents'
import BasicDetails from './details/BasicDetails'
import DriveDescription from './details/DriveDescription'
import AttachedFiles from './details/AttachedFiles'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getJobDriveDetails } from '@/redux/jobSlice'
import { Loader2 } from 'lucide-react'
import Loading from '../common/Loading'

const JobDetail = () => {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state["auth"])
  const { job, isLoading } = useSelector((state) => state["job"]);

  useEffect(() => {
    const fetchJob = async () => {
      const response = await dispatch(getJobDriveDetails({ id: jobId }))
    }
    fetchJob();
  }, [jobId])

  if (isLoading) {
    return <Loading />
  }
  return (

    job && <div className='space-y-6'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
        {/* Basic overview of details */}
        <BasicDetails job={job} />
        {/* Drive Description */}
        <DriveDescription job={job} />
      </div>
      {/* Related files */}
      <AttachedFiles job={job} />
      {/* Opted students - only for admin */}
      {
        role == "student" && <Card>
          <CardHeader>
            <CardTitle>Details of Opted Students</CardTitle>
            <CardDescription>Below are the students who have shown interest in the job drive</CardDescription>
          </CardHeader>
          <CardContent>
            <OptedStudents job={job} />
          </CardContent>
        </Card>
      }
    </div>


  )
}

export default JobDetail