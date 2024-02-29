import InternshipCard from '@/components/internships/InternshipCard'
import TanstackTable from '@/components/table/TanstackTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { internshipTableColumns } from '@/data/internships';
import { useQueryParams } from '@/hooks/useQueryParams';
import { BuildingIcon, Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from 'react'
import { getInternships, handleFilter } from '@/redux/internshipSlice';
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select';

// import { useLocation, useNavigate } from 'react-router-dom';
const Internships = () => {
  // const params = useQueryParams();

  const [view, setView] = useState("table");
  const { internships, isLoading } = useSelector((state) => state["internship"]);


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInternships())
  }, [])
  if (isLoading) {
    return <div className='flex items-center justify-center h-[80vh]'>
      <Loader2 className='animate-spin' />
    </div>
  }

  return (
    <>
      <div className='flex flex-col space-y-6'>
        <div className='flex items-center space-x-2 justify-between'>
          <div>
            <Select className="w-72" onValueChange={(e) => dispatch(handleFilter({ status: e }))}>
              <SelectTrigger className="w-72">
                <SelectValue placeholder="Choose Verification Status" />
              </SelectTrigger>
              <SelectContent className="w-72">
                {
                  ["all", "pending", "verified", "rejected"].map((status, index) => {
                    return (
                      <SelectItem value={status} key={index}>{status}</SelectItem>
                    )
                  })
                }
              </SelectContent>
            </Select>
          </div>
          <div className='flex items-center space-x-3'>
            <Switch onCheckedChange={e => {
              e ? setView("table") : setView("card")
            }} defaultChecked={view == "table"} />
            <Label>Table View</Label>
          </div>
        </div>
        {
          view == "table" ? <TanstackTable tableData={internships} columns={internshipTableColumns} /> : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
              {
                internships?.map((internship, index) => {
                  return (
                    <InternshipCard internship={internship} key={index} />
                  )
                })
              }
            </div>
          )
        }
      </div>
    </>
  )
}

export default Internships