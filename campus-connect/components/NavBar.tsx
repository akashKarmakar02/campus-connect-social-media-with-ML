import { AiOutlineHome, AiOutlineYoutube } from "react-icons/ai";
import { MdOutlineGroups, MdNotifications } from "react-icons/md";
import { PiChatCircleFill } from "react-icons/pi";
import { FaUserAlt } from "react-icons/fa";
import Link from "next/link";
import { Session } from "next-auth";
import ProfileButton from "./ProfileButton";

function NavBar({ session }: { session: Session | null }) {
  return (
    <div className="w-full fixed z-0 top-0 bg-white shadow-sm">
      <nav className="px-4 py-3 flex justify-between items-center">
        <div className="text-3xl font-semibold">Campus Connect</div>
        <ul className="flex space-x-2 items-center">
          <Link
            href={"/"}
            className="bg-gray-50 rounded-lg hover:bg-gray-200 hover:cursor-pointer px-4 py-1"
          >
            <AiOutlineHome size={30} />
          </Link>
          <li className="bg-gray-50 rounded-lg hover:bg-gray-200 hover:cursor-pointer px-4 py-1">
            <AiOutlineYoutube size={30} />
          </li>
          <li className="bg-gray-50 rounded-lg hover:bg-gray-200 hover:cursor-pointer px-4 py-1">
            <MdOutlineGroups size={30} />
          </li>
        </ul>
        {session ? (
          <ul className="flex items-center space-x-2">
            <li className="p-2.5 rounded-full bg-gray-200 hover:bg-gray-300">
              <PiChatCircleFill size={20} />
            </li>
            <li className="p-2.5 rounded-full bg-gray-200 hover:bg-gray-300">
              <MdNotifications size={20} />
            </li>
            <li>
              <ProfileButton />
            </li>
          </ul>
        ) : (
          <Link href={"/login"}>Sign in</Link>
        )}
      </nav>
    </div>
  );
}

export default NavBar;
