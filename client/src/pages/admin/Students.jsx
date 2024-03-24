import Loading from '@/components/common/Loading';
import TanstackTable from '@/components/table/TanstackTable'
import { studentTableColumns } from '@/data/students'
import { getStudents } from '@/redux/studentSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

const Students = () => {
  const dispatch = useDispatch();
  const { students, isLoading } = useSelector((state) => state["student"]);
  useEffect(() => {
    dispatch(getStudents());
  }, [])
  if (isLoading) {
    return <Loading />
  }
  return (
    <div>
      <TanstackTable tableData={students} columns={studentTableColumns} />
    </div>
  )
}

export default Students