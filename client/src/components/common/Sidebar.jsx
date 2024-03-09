/* eslint-disable react/prop-types */
import { sidebarLinks } from "@/utils/sidebarLinks";
import { Link } from "react-router-dom";

const Sidebar = ({ show, role }) => {

  return (
    <aside className={` flex flex-col justify-center items-center fixed w-[26] lg:block h-screen px-2 bg-white border-r border-r-blue-gray-50 hidden lg:block ${show ? "block" : "hidden"}`}>
      {sidebarLinks[role]?.map((link, index) => (
        <Link
          key={index}
          to={`/${role}/${link.href}`}
          className="w-20 h-20 flex flex-col gap-[2px] items-center justify-center cursor-pointer hover:bg-blue-gray-50"
        >
          {link.icon}
          <div className="text-xs">{link.text}</div>
        </Link>
      ))}
    </aside>
  );

};

export default Sidebar;