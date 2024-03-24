import Loading from "@/components/common/Loading"
import AddCoordinator from "@/components/coordinator/AddCoordinator"
import TanstackTable from "@/components/table/TanstackTable"
import { coordinatorTableColumns } from "@/data/coordinators"
import { getUsers } from "@/redux/userSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const Coordinators = () => {
  const { users, isLoading } = useSelector((state) => state["user"]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers())
  }, [])
  if (isLoading) {
    return <Loading />
  }
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-end">
        <AddCoordinator />
      </div>
      <div>
        <TanstackTable tableData={users} columns={coordinatorTableColumns} />
      </div>
    </div>
  )
}

export default Coordinators