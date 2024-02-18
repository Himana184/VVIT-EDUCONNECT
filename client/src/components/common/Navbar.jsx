import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import Sidebar from "./Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";

export function Navbar() {
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
          <Link to={"/admin"}>
            <img
              src="/logo.png"
              alt="logo"
              className="w-44 lg:w-52"
            />
          </Link>
        </div>
        <div className="flex  items-center justify-center gap-5">
          <div>
            <Button variant="destructive" className="font-semibold" onClick={handleLogout}>Logout</Button>
          </div>
          <div className="block lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <GiHamburgerMenu size={30} className="cursor-pointer" />
              </SheetTrigger>
              <SheetContent className="w-32 pt-12">
                <Sidebar show={true} />
              </SheetContent>
            </Sheet>
          </div>
        </div>


      </div>
    </div>
  );
}

export default Navbar;