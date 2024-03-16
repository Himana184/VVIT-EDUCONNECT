import SendNotification from "@/components/notifications/SendNotification"


const Notifications = () => {

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-end">
        <SendNotification />
      </div>
    </div>
  )
}

export default Notifications