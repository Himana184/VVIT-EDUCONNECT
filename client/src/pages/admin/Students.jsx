import TanstackTable from '@/components/table/TanstackTable'
import { studentTableColumns } from '@/data/students'
import { getStudents } from '@/redux/studentSlice';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

const Students = () => {
  const dispatch = useDispatch();
  const { students, isLoading } = useSelector((state) => state["student"]);
  useEffect(() => {
    dispatch(getStudents());
  }, [])
  if (isLoading) {
    return <div className='flex justify-center h-full w-full items-center'>
      <Loader2 className='animate-spin flex' />
    </div>
  }
  return (
    <div>
      <TanstackTable tableData={students} columns={studentTableColumns} />
    </div>
  )
}

export default Students