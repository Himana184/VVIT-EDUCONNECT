import AddCertification from "@/components/certifications/AddCertification"
import Loading from "@/components/common/Loading"
import TanstackTable from "@/components/table/TanstackTable"
import { adminCertificationTableColumns, studentCertificationTableColumns } from "@/data/certifications"
import { getCertifications } from "@/redux/certificationSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const Certifications = () => {

  const { certifications, isLoading } = useSelector((state) => state["certification"]);
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
        !isLoading ? role == "student" ? <TanstackTable tableData={certifications || []} columns={studentCertificationTableColumns} />
          : <TanstackTable tableData={certifications || []} columns={adminCertificationTableColumns} /> : <Loading />
      }
    </div>
  )

}

export default Certifications