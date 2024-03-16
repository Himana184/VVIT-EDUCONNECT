import { messaging } from "@/firebase";
import { getToken } from "firebase/messaging";
import toast from "react-hot-toast";

export const requestPermission = async () => {
  const permission = await Notification.requestPermission();
  console.log("Permission : ", permission);
  if (permission === "granted") {
    // Generate Token
    const res = await getToken(messaging, {
      vapidKey:
        "BBtHQvrHQ64qM3Ub5XR7KKvpGOidMc9A0XLWTP6f3zrLZZ4dOHgw_ErP5n_nIOZpl-rNbJnWEhVowO4Ro6qjPkU",
    });
    console.log("Firebase permission log : ", res);
    return { status: true, response: res };
  } else if (permission === "denied") {
    toast.error("Notifications Blocked!", {
      position: "top-right",
      theme: "light",
    });
    return { status: false };
  }
};
