import { Link, useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import Sidebar from "./Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";
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

export function Navbar() {
  const { role, user } = useSelector((state) => state["auth"]);
  console.log(user)
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user.image}
                    alt="avatar"
                  />
                  <AvatarFallback>{role.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-36">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link to={`/${role}/profile`}>
                    <DropdownMenuItem>
                      Profile
                    </DropdownMenuItem>
                  </Link>

                  {/* <DropdownMenuItem>
                    Settings
                  </DropdownMenuItem> */}
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
                <Sidebar show={false} />
              </SheetContent>
            </Sheet>
          </div>
        </div>


      </div>
    </div>
  );
}

export default Navbar;