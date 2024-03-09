import AddCertification from "@/components/certifications/AddCertification"
import TanstackTable from "@/components/table/TanstackTable"
import { adminCertificationTableColumns, studentCertificationTableColumns } from "@/data/certifications"
import { getCertifications } from "@/redux/certificationSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const Certifications = () => {

  const { certifications } = useSelector((state) => state["certification"]);
  const { role } = useSelector((state) => state["auth"])
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCertifications())
  }, [])

  return (
    <div>
      {
        role == "student" && <div className="flex justify-end">
          <AddCertification />
        </div>
      }
      {
        role == "student" ? <TanstackTable tableData={certifications || []} columns={studentCertificationTableColumns} />
          : <TanstackTable tableData={certifications || []} columns={adminCertificationTableColumns} />
      }
    </div>
  )

}

export default Certifications