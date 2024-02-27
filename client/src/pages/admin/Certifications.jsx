import TanstackTable from "@/components/table/TanstackTable"
import { certificationTableColumns } from "@/data/certifications"
import AddCertification from "@/components/certifications/AddCertification"
import { getCertifications } from "@/redux/certificationSlice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const Certifications = () => {
  const { certifications } = useSelector((state) => state["certification"]);
  const [data, setData] = useState(certifications);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCertifications())
  }, [])
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-end">
        <AddCertification />
      </div>

      <div>
        <TanstackTable tableData={certifications} columns={certificationTableColumns} />
      </div>

    </div>

  )
}

export default Certifications;