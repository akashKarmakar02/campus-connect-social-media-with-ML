"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

function ProfileButton() {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <div
        className="p-2.5 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer"
        onClick={() => setToggle(!toggle)}
      >
        <FaUserAlt size={20} />
      </div>
      <div
        className={`${
          toggle ? "flex" : "hidden"
        } px-6 py-3 bg-gray-50 shadow-md absolute right-0 mx-4 my-2 min-w-[150px] z-10 rounded-xl`}
      >
        <ul className="list-none flex flex-col justify-end items-start gap-4">
          <Link
            href={"/account"}
            className="font-poppins text-[16px] font-medium cursor-pointer flex items-center space-x-2"
          >
            <FaUserAlt />
            <p>Account</p>
          </Link>
          <li
            className="font-poppins text-[16px] font-medium cursor-pointer flex items-center space-x-2"
            onClick={() => signOut()}
          >
            <FiLogOut />
            <p>Logout</p>
          </li>
        </ul>
      </div>
    </>
  );
}

export default ProfileButton;
