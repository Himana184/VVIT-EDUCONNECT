import InternshipCard from '@/components/internships/InternshipCard'
import TanstackTable from '@/components/table/TanstackTable';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { studentTableColumns, studentsData } from '@/data/students';
import React, { useState } from 'react'

const Internships = () => {
  const [tableView, setTableView] = useState(false);

  return (
    <div className='flex flex-col space-y-6'>
      <div className='flex items-center space-x-2 justify-end'>
        <Switch onCheckedChange={e => setTableView(e)} />
        <Label>Table View</Label>
      </div>
      {
        tableView == true ? <TanstackTable tableData={studentsData} columns={studentTableColumns} /> : <InternshipCard />
      }
    </div>

  )
}

export default Internships