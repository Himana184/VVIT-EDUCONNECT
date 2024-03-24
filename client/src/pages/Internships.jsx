import TanstackTable from '@/components/table/TanstackTable';
import { adminInternshipTableColumns, studentInternshipTableColumns } from '@/data/internships';
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react'
import { getInternships, handleFilter } from '@/redux/internshipSlice';
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select';
import AddInternship from '@/components/internships/AddInternship';
import { internshipVerificationStatus } from '@/utils/internship';
import Loading from '@/components/common/Loading';

const Internships = () => {

  const { internships, isLoading } = useSelector((state) => state["internship"]);
  const { role } = useSelector((state) => state["auth"])

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInternships())
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <div className='flex flex-col space-y-6'>
        {
          role == "student" && <div className='flex justify-end'>
            <AddInternship />
          </div>
        }
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
        {
          !isLoading ? role == "student" ? <TanstackTable tableData={internships || []} columns={studentInternshipTableColumns} />
            : <TanstackTable tableData={internships || []} columns={adminInternshipTableColumns} /> : <Loading />
        }

      </div>
    </>
  )
}

export default Internships