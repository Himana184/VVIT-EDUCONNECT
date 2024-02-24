import AddCertification from "@/components/certifications/AddCertification"
import TanstackTable from "@/components/table/TanstackTable"
import { certificationTableColumns, certificationsData } from "@/data/certifications"

const StuCertifications = () => {
  return (
    <div>
      <div className="flex justify-end">
        <AddCertification />
      </div>
      <div>
      <TanstackTable tableData={certificationsData} columns={certificationTableColumns} />
    </div>
    </div>
    
  )
}

export default StuCertifications