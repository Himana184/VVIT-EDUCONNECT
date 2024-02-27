import TanstackTable from "@/components/table/TanstackTable"
import { certificationTableColumns } from "@/data/certifications"
import AddCertification from "@/components/certifications/AddCertification"
import { getCertifications } from "@/redux/certificationSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const Certifications = () => {
  const {certificate} = useSelector((state)=>state["certificate"]);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getCertifications())
  },[])
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-end">
        <AddCertification />
      </div>

      <div>
        <TanstackTable tableData={certificate} columns={certificationTableColumns} />
      </div>

    </div>

  )
}

export default Certifications;