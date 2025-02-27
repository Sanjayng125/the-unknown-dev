"use client";

import Hero from "@/components/Hero";
import Loader from "@/components/Loader";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import useDetailsStore from "@/context/mystore";
import { updatevisitCount } from "@/utils/actions";
import React, { useEffect } from "react";

const Page = () => {
  const store = useDetailsStore();

  const projectsRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    store.fetchData();
  }, []);

  useEffect(() => {
    const handleVisitCount = async () => {
      const visited = localStorage.getItem("theunknowndev-sng");

      if (!visited) {
        const res = await updatevisitCount();
        if (res.success) {
          localStorage.setItem("theunknowndev-sng", "1");
        }
      }
    };

    handleVisitCount();
  }, []);

  return (
    <div className="w-full h-full pt-5 px-2 sm:px-10 flex flex-col items-center relative">
      {store.loading && !store.name && <Loader />}
      {store.loading && !store?.name ? (
        <></>
      ) : (
        <>
          <Hero
            name={store.name}
            welcomeMsg={store.welcomeMsg}
            sub={store.sub}
            github={store.contacts.github}
            projectsRef={projectsRef}
            loading={store.loading}
          />

          <Skills skills={store.skills} loading={store.loading} />

          <Projects
            projects={store.projects}
            loading={store.loading}
            projectsRef={projectsRef}
          />
        </>
      )}
    </div>
  );
};

export default Page;
