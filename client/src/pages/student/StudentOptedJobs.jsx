/* eslint-disable react/prop-types */
import TanstackTable from '@/components/table/TanstackTable';
import { studentOptedJobs } from '@/data/optedJobs';
import { useSelector } from 'react-redux'

const StudentOptedJobs = () => {
  const { student } = useSelector((state) => state["student"]);
  const optedJobs = student.optedJobs;
  return (
    <TanstackTable tableData={optedJobs || []} columns={studentOptedJobs} />
  )
}

export default StudentOptedJobs