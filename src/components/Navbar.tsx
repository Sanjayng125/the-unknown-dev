"use client";

import { EditIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="w-full p-5 border-b-2 flex items-center justify-between">
      <Link
        href={"/"}
        className="flex justify-center items-center w-max border-b-2 bg-gradient-to-tr from-purple-700 rounded-tl-xl pl-2"
      >
        <h1 className="font-semibold text-xl">TheUnknown</h1>
        <h1 className="font-semibold text-xl bg-white text-black pr-1">DEV</h1>
      </Link>
      {session && session?.user && (
        <div className="flex gap-3 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <FaBars className="text-xl" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="absolute right-0 flex flex-col items-center gap-2">
              <Link
                href={"/edit"}
                className="w-full p-2 rounded-xl flex items-center justify-center gap-2 border-2"
              >
                Edit
                <EditIcon />
              </Link>
              <button
                onClick={() => signOut()}
                className="w-full bg-red-500 p-2 rounded-xl"
              >
                Sign Out
              </button>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
