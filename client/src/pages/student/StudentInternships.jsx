/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import TanstackTable from '@/components/table/TanstackTable';
import { profileInternshipColumns } from '@/data/internships';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react'
import { getInternships } from '@/redux/internshipSlice';

const StudentInternships = () => {
  const { student, isLoading } = useSelector((state) => state["student"]);
  const internships = student.internships;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInternships())
  }, [])

  if (isLoading) {
    return <div className='flex items-center justify-center h-[80vh]'>
      <Loader2 className='animate-spin' />
    </div>
  }

  return (
    <>
      <TanstackTable tableData={internships || []} columns={profileInternshipColumns} />
    </>
  )
}

export default StudentInternships