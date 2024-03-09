/* eslint-disable react/prop-types */
import AnnouncementCard from "./AnnouncementCard"

const DispalyAnnouncements = ({ announcements }) => {
  return (
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
  )
}

export default DispalyAnnouncements