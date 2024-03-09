import DispalyAnnouncements from "@/components/announcements/DispalyAnnouncements"
import Loading from "@/components/common/Loading"
import { Button } from "@/components/ui/button"
import { getAnnouncements } from "@/redux/announcementSlice"
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
      <DispalyAnnouncements announcements={announcements} />
    </div>
  )
}

export default Announcements