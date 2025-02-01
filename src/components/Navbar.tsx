"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

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
      <div>
        {session && session?.user && (
          <button
            onClick={() => signOut()}
            className="bg-red-500 p-2 rounded-xl"
          >
            Sign Out
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
