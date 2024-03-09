/* eslint-disable react/prop-types */
import { optedStudentsTableColumns } from '@/data/optedStudents'
import TanstackTable from '../table/TanstackTable'

const OptedStudents = ({ students }) => {

  return (
    students?.length == 0 ? <p>No Details to dispaly</p> : <TanstackTable tableData={students} columns={optedStudentsTableColumns} />
  )
}

export default OptedStudents