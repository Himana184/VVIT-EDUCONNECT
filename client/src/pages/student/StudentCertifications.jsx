import Loading from "@/components/common/Loading"
import TanstackTable from "@/components/table/TanstackTable"
import { profileCertificationColumns } from "@/data/certifications"
import { getCertifications } from "@/redux/certificationSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const StudentCertifications = () => {

  const dispatch = useDispatch();
  const { student, isLoading } = useSelector((state) => state["student"]);

  const certifications = student.certifications;

  useEffect(() => {
    dispatch(getCertifications())
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div>
      <TanstackTable tableData={certifications || []} columns={profileCertificationColumns} />
    </div>
  )

}

export default StudentCertifications