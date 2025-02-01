"use client";

import UpdateContact from "@/components/UpdateContact";
import UpdateInfo from "@/components/UpdateInfo";
import UpdateProject from "@/components/UpdateProject";
import UpdateSkill from "@/components/UpdateSkill";
import React from "react";

const Page = () => {
  return (
    <div className="w-full flex justify-center p-2 sm:p-5">
      <div className="w-full p-2 sm:p-5 bg-gray-900 rounded-xl mt-5">
        <UpdateInfo />

        <UpdateSkill />

        <UpdateProject />

        <UpdateContact />
      </div>
    </div>
  );
};

export default Page;
