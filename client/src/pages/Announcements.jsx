import DispalyAnnouncements from "@/components/announcements/DispalyAnnouncements"
import Loading from "@/components/common/Loading"
import { Button } from "@/components/ui/button"
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { filterByPriority, getAnnouncements } from "@/redux/announcementSlice"
import { announcementPriorities } from "@/utils/announcement"
import { useEffect } from "react"
import { TfiAnnouncement } from "react-icons/tfi"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Announcements = () => {

  const { announcements, isLoading, currentPriority } = useSelector((state) => state["announcement"]);
  const { role } = useSelector((state) => state["auth"]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAnnouncements())
  }, [])

  return (
    <>
      <div className="flex justify-between space-y-6 mb-10">
        <CardHeader className="p-0 pt-4">
          <CardTitle>Announcements</CardTitle>
          <CardDescription>View all the latest announcements here</CardDescription>
        </CardHeader>
        <div className="flex flex-col md:flex-row space-x-4">
          <Select className="place-self-end" defaultValue={currentPriority} onValueChange={(e) => dispatch(filterByPriority({ priority: e }))}>
            <SelectTrigger className="w-72">
              <SelectValue placeholder="Select a priority"></SelectValue>
            </SelectTrigger>
            <SelectContent className="">
              {
                announcementPriorities.map((priorityType, index) => {
                  return (
                    <SelectItem key={index} value={priorityType.value}>{priorityType.name}</SelectItem>
                  )
                })
              }
            </SelectContent>
          </Select>
          {
            role === "admin" &&
            (
              <div className="flex justify-end">
                <Link to={"/admin/addAnnouncement"}>
                  <Button className="space-x-2">
                    <TfiAnnouncement className="font-semibold text-lg" />
                    <span className="hidden md:block">Add Announcement</span>
                  </Button>
                </Link>
              </div>
            )
          }
        </div>
      </div>
      {
        isLoading ? <Loading /> : <DispalyAnnouncements announcements={announcements} />
      }

    </>
  )
}

export default Announcements