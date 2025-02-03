"use client";

import Loader from "@/components/Loader";
import UpdateContact from "@/components/UpdateContact";
import UpdateInfo from "@/components/UpdateInfo";
import UpdateProject from "@/components/UpdateProject";
import UpdateSkill from "@/components/UpdateSkill";
import useDetailsStore from "@/context/mystore";
import React, { useEffect } from "react";

const Page = () => {
  const store = useDetailsStore();

  useEffect(() => {
    if (store && !store.name) {
      store.fetchData();
    }
  }, [store?.name]);

  return (
    <div className="w-full flex justify-center p-2 sm:p-5">
      {store?.loading && !store.name ? (
        <Loader />
      ) : (
        <div className="w-full p-2 sm:p-5 bg-gray-900 rounded-xl mt-5">
          <UpdateInfo />

          <UpdateSkill />

          <UpdateProject />

          <UpdateContact />
        </div>
      )}
    </div>
  );
};

export default Page;
