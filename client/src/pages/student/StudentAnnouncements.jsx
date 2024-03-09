import DispalyAnnouncements from "@/components/announcements/DispalyAnnouncements";
import { getAnnouncements } from "@/redux/announcementSlice";
import { Select, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const StudentAnnouncements = () => {
  const { announcements } = useSelector((state) => state["announcement"]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAnnouncements())
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
        </Select>
      </div>
      <DispalyAnnouncements announcements={announcements} />
    </div>
  )
}

export default StudentAnnouncements