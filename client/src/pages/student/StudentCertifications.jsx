import Loading from "@/components/common/Loading"
import TanstackTable from "@/components/table/TanstackTable"
import { profileCertificationColumns } from "@/data/certifications"
import { useSelector } from "react-redux"

const StudentCertifications = () => {

  const { student, isLoading } = useSelector((state) => state["student"]);

  const certifications = student.certifications;


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