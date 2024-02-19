import AddCoordinator from "@/components/coordinator/AddCoordinator"
import TanstackTable from "@/components/table/TanstackTable"
import { coordinatorTableColumns, coordinatorsData } from "@/data/coordinators"

const Coordinators = () => {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-end">
        <AddCoordinator />
      </div>
      <div>
        <TanstackTable tableData={coordinatorsData} columns={coordinatorTableColumns} />
      </div>
    </div>
  )
}

export default Coordinators