/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Loading from '@/components/common/Loading';
import TanstackTable from '@/components/table/TanstackTable';
import { profileInternshipColumns } from '@/data/internships';
import { Loader2 } from 'lucide-react';
import { useSelector } from "react-redux"

const StudentInternships = () => {
  const { student, isLoading } = useSelector((state) => state["student"]);
  const internships = student.internships;

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <TanstackTable tableData={internships || []} columns={profileInternshipColumns} />
    </>
  )
}

export default StudentInternships