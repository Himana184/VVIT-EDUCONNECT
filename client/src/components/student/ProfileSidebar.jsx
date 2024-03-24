/* eslint-disable react/prop-types */
import { cn } from "@/lib/utils"
import { buttonVariants } from "../ui/button"
import { Link, useLocation } from "react-router-dom"

export function ProfileSidebar({ className, items, ...props }) {
  const { pathname } = useLocation()
  const paths = pathname.split("/");
  const currentPath = paths[paths.length - 1];
  
  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 justify-center overflow-auto",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            currentPath === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-center"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}