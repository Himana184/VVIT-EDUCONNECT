import AddAnnouncement from "@/components/announcements/AddAnnouncement"
import AnnouncementCard from "@/components/announcements/AnnouncementCard"

const Announcements = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <AddAnnouncement />
      </div>
      <div>
        <AnnouncementCard />
      </div>
    </div>
  )
}

export default Announcements