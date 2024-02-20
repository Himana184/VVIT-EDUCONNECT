import { PiStudentFill, PiCertificateFill } from "react-icons/pi";
import { TfiAnnouncement } from "react-icons/tfi";
import { FaRegUser } from "react-icons/fa"
import { MdOutlineHelp } from "react-icons/md";
import { BriefcaseIcon, FolderKanban } from "lucide-react";

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
      icon: <MdOutlineHelp size={24} />,
      text: "Queries",
      href: "queries"
    }
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
      icon: <MdOutlineHelp size={24} />,
      text: "Queries",
      href: "queries"
    }
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
      href: "announcements",
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
      icon: <MdOutlineHelp size={24} />,
      text: "Queries",
      href: "queries"
    }
  ]
}