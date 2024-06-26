import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { requestPermission } from "@/utils/requestPermission";
import { handleSaveUserToken } from "@/redux/notificationSlice";
import { sidebarLinks } from "@/utils/sidebarLinks";

export function Navbar() {
  const dispatch = useDispatch();
  const { role, user } = useSelector((state) => state["auth"]);
  const handleNotification = async () => {
    const data = await requestPermission();
    if (data.status) {
      dispatch(handleSaveUserToken({ token: data.response }));
      window.location.reload();
    }
  }
  const handleLogout = () => {
    localStorage.clear()
    window.location.reload();

  }

  return (
    <div className="fixed z-50 w-full h-20 bg-white border-b border-b-blue-gray-50">
      <div className="mx-auto flex items-center justify-between px-4 py-2 lg:py-[18px] sm:px-6 lg:px-8 h-[87px]">
        <div className="inline-flex items-center space-x-2 cursor-pointer">
          <Link to={`/${role}`}>
            <img
              src="https://storage.googleapis.com/educonnect-testing-1/logo.png"
              alt="logo"
              className="w-24 h-16"
            />
          </Link>
        </div>
        <div className="flex  items-center justify-center gap-5">
          <div>
            <DropdownMenu className="w-72">
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user.image}
                    alt="avatar"
                  />
                  <AvatarFallback>{role.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>

                  {
                    role == "student" && (
                      <div className="flex items-center justify-center gap-2">
                        <Switch defaultChecked={user.deviceTokens.length > 0} onCheckedChange={(e) => e ? handleNotification() : console.log("Must implement to remove device token")}></Switch>
                        <Label>Notifications</Label>
                      </div>
                    )
                  }
                </DropdownMenuGroup>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleLogout}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="block lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <GiHamburgerMenu size={30} className="cursor-pointer" />
              </SheetTrigger>
              <SheetContent className="w-32 pt-12">
                <p>Hello wolrfd</p>
                {
                  <div className={`flex flex-col  justify-center items-center fixed w-fit h-screen px-2 bg-red-500 border-r border-r-blue-gray-50`}>
                    {sidebarLinks[role]?.map((link, index) => (
                      <Link
                        key={index}
                        to={`/${role}/${link.href}`}
                        className="w-20 h-20 flex flex-col gap-[2px] items-center justify-center cursor-pointer hover:bg-blue-gray-50"
                      >
                        {link.icon}
                        <div className="text-xs">{link.text || "H"}</div>
                      </Link>
                    ))}
                  </div>
                }
              </SheetContent>
            </Sheet>
          </div>
        </div>


      </div>
    </div>
  );
}

export default Navbar;