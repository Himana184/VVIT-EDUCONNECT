import InternshipCard from '@/components/internships/InternshipCard'
import TanstackTable from '@/components/table/TanstackTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { internshipTableColumns, internshipsData } from '@/data/internships';
import { useQueryParams } from '@/hooks/useQueryParams';
import { BuildingIcon } from 'lucide-react';
import { useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom';
const Internships = () => {
  // const params = useQueryParams();
  const [view, setView] = useState("card")
  return (
    <>
      <div className='flex flex-col space-y-6'>
        <div className='flex items-center space-x-2 justify-end'>
          <Switch onCheckedChange={e => {
            e ? setView("table") : setView("card")
          }} defaultChecked={view == "table"} />
          <Label>Table View</Label>
        </div>
        {
          view == "table" ? <TanstackTable tableData={internshipsData} columns={internshipTableColumns} /> : <InternshipCard />
        }
      </div>
    </>
  )
}

export default Internships