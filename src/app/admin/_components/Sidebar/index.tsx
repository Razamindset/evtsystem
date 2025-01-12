import Link from "next/link";
import { FaPoll, FaUserPlus } from "react-icons/fa";
import { MdAdminPanelSettings, MdPoll } from "react-icons/md";
import SignOutButton from "./signout-button";

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const links = [
    {
      name: "Dashboard",
      link: "/admin",
      icon: <MdAdminPanelSettings size={25} />,
    },
    {
      name: "Add Users",
      link: "/admin/addusers",
      icon: <FaUserPlus size={25} />,
    },
    {
      name: "Election",
      link: "/admin/elections",
      icon: <FaPoll size={25} />,
    },
  ];

  return (
    <div className="h-screen w-screen p-1">
      <div className="h-full w-full flex items-center justify-between gap-2">
        <aside className="bg-gray-900 text-white rounded-md h-full p-1 w-max flex flex-col justify-between">
          <div className="icon w-max flex items-center gap-1">
            <MdPoll size={35} className="text-green-600" />
            <span className="font-semibold text-xl text-center p-2">EVTS</span>
          </div>

          <nav className="flex flex-col gap-2 mb-24">
            {links.map((link, i) => (
              <Link key={i} href={link.link} className="">
                <div className="flex items-center gap-2 transition hover:bg-gray-700 p-2 rounded-md hover:text-green-600">
                  {link.icon}
                  {link.name}
                </div>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 px-4 mb-4">
            <SignOutButton />
          </div>
        </aside>

        <div className="h-full w-full bg-gray-900 text-white ">{children}</div>
      </div>
    </div>
  );
}
