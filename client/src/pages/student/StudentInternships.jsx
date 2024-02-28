import InternshipCard from '@/components/internships/InternshipCard'
import TanstackTable from '@/components/table/TanstackTable';
import AddInternship from '@/components/internships/AddInternship';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { internshipTableColumns } from '@/data/internships';
import { useQueryParams } from '@/hooks/useQueryParams';
import { BuildingIcon } from 'lucide-react';
import { useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom';
const StudentInternships = () => {
  // const params = useQueryParams();
  const [view, setView] = useState("card")
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
          <Label>Table View</Label>
        </div>
        {
          view == "table" ? <TanstackTable tableData={[]} columns={internshipTableColumns} /> : <InternshipCard />
        }
      </div>
    </div>
      
    </>
  )
}

export default StudentInternships