//import AddAnnouncement from "@/components/announcements/AddAnnouncement"
import AnnouncementCard from "@/components/announcements/AnnouncementCard"
import { getAnnouncements } from "@/redux/adminAnnouncementSlice";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
const StudentAnnouncements = () => {
  const { announcements } = useSelector((state) => state["announcement"]);
  const [data, setData] = useState(announcements);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAnnouncements())
  }, [])
  return (
    <div className="space-y-6">
      
      <div>
        <AnnouncementCard />
      </div>
    </div>
  )
}

export default StudentAnnouncements