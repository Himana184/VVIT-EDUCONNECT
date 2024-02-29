import AddAnnouncement from "@/components/announcements/AddAnnouncement"
//import AnnouncementCard from "@/components/announcements/AnnouncementCard"
import AnnouncementCard from "@/components/announcements/AnnouncementCard"
import { getAnnouncements } from "@/redux/adminAnnouncementSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
const Announcements = () => {
  const { announcements } = useSelector((state) => state["announcement"]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAnnouncements())
  }, [])

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-end">
        <AddAnnouncement />
      </div>
      <div>
        {
          announcements.length > 0 ? (
            announcements.map((announcement, index) => {
              return <AnnouncementCard key={index} announcement={announcement} />
            })
          ) : <AnnouncementCard />
        }
      </div>
    </div>
  )
}

export default Announcements