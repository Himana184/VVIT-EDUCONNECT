import TanstackTable from "@/components/table/TanstackTable"
import { certificationTableColumns,certifications } from "@/data/certifications"
//import AddCertification from "@/components/certifications/AddCertification"
import { getCertifications } from "@/redux/certificationSlice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const Certifications = () => {
  // const { certifications } = useSelector((state) => state["certification"]);
  const [data, setData] = useState(certifications);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCertifications())
  }, [])
  return (
    <div className="flex flex-col space-y-6">
      <div>
        {
          certifications?.length > 0 ? <TanstackTable tableData={certifications} columns={certificationTableColumns} /> : <p className="font-semibold text-xl flex justify-center">Noting to display</p>
        }

      </div>

    </div>

  )
}

export default Certifications;