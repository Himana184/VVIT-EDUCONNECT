/* eslint-disable no-unused-vars */
import InternshipCard from '@/components/internships/InternshipCard'
import TanstackTable from '@/components/table/TanstackTable';
import { adminInternshipTableColumns, studentInternshipTableColumns } from '@/data/internships';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from 'react'
import { getInternships, handleFilter } from '@/redux/internshipSlice';
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select';
import AddInternship from '@/components/internships/AddInternship';
import { internshipVerificationStatus } from '@/utils/internship';

const StudentInternships = () => {

  const [view, setView] = useState("table");
  const { role } = useSelector((state) => state["auth"])
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
      <div className='flex flex-col space-y-6'>
        <div className='flex items-center space-x-2 justify-between'>
          <div>
            <Select className="w-72" onValueChange={(e) => dispatch(handleFilter({ status: e }))}>
              <SelectTrigger className="w-72">
                <SelectValue placeholder="Choose Verification Status" />
              </SelectTrigger>
              <SelectContent className="w-72">
                {
                  internshipVerificationStatus.map((status, index) => {
                    return (
                      <SelectItem value={status} key={index}>{status}</SelectItem>
                    )
                  })
                }
              </SelectContent>
            </Select>
          </div>

        </div>
        <TanstackTable tableData={internships || []} columns={adminInternshipTableColumns} />
      </div>
    </>
  )
}

export default StudentInternships