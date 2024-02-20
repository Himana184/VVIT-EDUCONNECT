import TanstackTable from "@/components/table/TanstackTable"
import { certificationTableColumns, certificationsData } from "@/data/certifications"

const Certifications = () => {
  return (
    <div>
      <TanstackTable tableData={certificationsData} columns={certificationTableColumns} />
    </div>
  )
}

export default Certifications