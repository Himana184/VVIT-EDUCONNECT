import { PiStudentFill, PiCertificateFill } from "react-icons/pi";
import { TfiAnnouncement } from "react-icons/tfi";
import { FaRegUser } from "react-icons/fa"
import { BriefcaseIcon, FolderKanban } from "lucide-react";
import { PiStack } from "react-icons/pi"


export const sidebarLinks = {
  admin: [
    {
      icon: <PiStudentFill size={24} />,
      text: "Students",
      href: "students"
    },
    {
      icon: <FaRegUser size={24} />,
      text: "Coordinators",
      href: "coordinators"
    },
    {
      icon: <BriefcaseIcon size={24} />,
      text: "Jobs",
      href: "jobs"
    },
    {
      icon: <FolderKanban size={24} />,
      text: "Internships",
      href: "internships"
    },
    {
      icon: <PiCertificateFill size={24} />,
      text: "Certifications",
      href: "certifications",
    },
    {
      icon: <TfiAnnouncement size={24} />,
      text: "Announcements",
      href: "announcements",
    },
    {
      icon: <PiStack size={24} />,
      text: "courses",
      href: "courses"
    },
    {
      icon: <TfiAnnouncement size={24} />,
      text: "Notifications",
      href: "notifications",
    },
  ],
  coordinator: [
    {
      icon: <PiStudentFill size={24} />,
      text: "Students",
      href: "students"
    },
    {
      icon: <BriefcaseIcon size={24} />,
      text: "Jobs",
      href: "jobs"
    },
    {
      icon: <PiCertificateFill size={24} />,
      text: "Certifications",
      href: "certifications",
    },
    {
      icon: <TfiAnnouncement size={24} />,
      text: "Announcements",
      href: "announcements",
    },
    {
      icon: <PiStack size={24} />,
      text: "Courses",
      href: "courses"
    },
    {
      icon: <FolderKanban size={24} />,
      text: "Internships",
      href: "internships"
    },
  ],
  teacher: [
    {
      icon: <PiStudentFill size={24} />,
      text: "Students",
      href: "students"
    },
  ],
  student: [
    {
      icon: <TfiAnnouncement size={24} />,
      text: "Announcements",
      href: "",
    },
    {
      icon: <BriefcaseIcon size={24} />,
      text: "Jobs",
      href: "jobs"
    },
    {
      icon: <PiCertificateFill size={24} />,
      text: "Certifications",
      href: "certifications",
    },
    {
      icon: <FolderKanban size={24} />,
      text: "Internships",
      href: "internships"
    },
    {
      icon: <PiStack size={24} />,
      text: "Courses",
      href: "courses"
    },
  ]
}