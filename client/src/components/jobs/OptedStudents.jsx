import { optedStudents, optedStudentsTableColumns } from '@/data/optedStudents'
import TanstackTable from '../table/TanstackTable'

const OptedStudents = () => {
  return (
    <TanstackTable tableData={optedStudents} columns={optedStudentsTableColumns} />
  )
}

export default OptedStudents