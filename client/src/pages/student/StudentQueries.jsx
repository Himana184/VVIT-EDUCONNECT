
import QueryCard from "@/components/queries/QueryCard"
import AddQuery from "@/components/queries/AddQuery"

const StudentQueries = () => {
  return (
    <div className="space-y-6">
        <div className="flex justify-end">
        <AddQuery />
      </div>
      
      <div>
        <QueryCard/>
      </div>
    </div>
  )
}

export default StudentQueries