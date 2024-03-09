import InternshipCard from '@/components/internships/InternshipCard'
import TanstackTable from '@/components/table/TanstackTable';
import AddInternship from '@/components/internships/AddInternship';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { internshipTableColumns } from '@/data/studentinternships';
import { useQueryParams } from '@/hooks/useQueryParams';
import { BuildingIcon } from 'lucide-react';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getInternships } from '@/redux/internshipSlice';
// import { useLocation, useNavigate } from 'react-router-dom';
const StudentInternships = () => {
  // const params = useQueryParams();
  const { internships } = useSelector((state) => state["internship"]);
  const [data, setData] = useState(internships);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInternships())
  }, [])
  const [view, setView] = useState("table")
  return (
    <>
    <div>
    <div className="flex justify-end" >
        <AddInternship />
      </div>
    <div className='flex flex-col space-y-6'>
        <div className='flex items-center space-x-2 space-y-2 justify-end'>
          <Switch onCheckedChange={e => {
            e ? setView("table") : setView("card")
          }} defaultChecked={view == "table"} />
          <Label>Card View</Label>
        </div>
        {
          view == "table" ? <TanstackTable tableData={internships} columns={internshipTableColumns} /> : <InternshipCard />
        }
      </div>
    </div>
      
    </>
  )
}

export default StudentInternships