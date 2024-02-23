import TanstackTable from '@/components/table/TanstackTable'
import { studentTableColumns, studentsData } from '@/data/students'

const Students = () => {
  return (
    <div>
      <TanstackTable tableData={studentsData} columns={studentTableColumns} />
    </div>
  )
}

export default Students