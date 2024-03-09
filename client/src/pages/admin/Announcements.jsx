
import AnnouncementCard from "@/components/announcements/AnnouncementCard"
import Loading from "@/components/common/Loading"
import { Button } from "@/components/ui/button"
import { getAnnouncements } from "@/redux/adminAnnouncementSlice"
import { useEffect } from "react"
import { TfiAnnouncement } from "react-icons/tfi"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
const Announcements = () => {
  const { announcements, isLoading } = useSelector((state) => state["announcement"]);
  const { role } = useSelector((state) => state["auth"]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAnnouncements())
  }, [])
  if (isLoading) {
    return <Loading />
  }
  return (
    <div className="flex flex-col space-y-6">
      {
        role === "admin" &&
        (
          <div className="flex justify-end">
            <Link to={"/admin/addAnnouncement"}>
              <Button className="space-x-2">
                <TfiAnnouncement className="font-semibold text-lg" />
                <span>Add Announcement</span>
              </Button>
            </Link>
          </div>
        )

      }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {
          announcements?.map((announcement, index) => {
            return <AnnouncementCard key={index} announcement={announcement} />
          })
        }
        {
          announcements.length == 0 && <p>No Announcements to display</p>
        }
      </div>
    </div>
  )
}

export default Announcements