"use client";

import Hero from "@/components/Hero";
import Loader from "@/components/Loader";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import useDetailsStore from "@/context/mystore";
import React, { useEffect } from "react";

const Page = () => {
  const store = useDetailsStore();

  const projectsRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    store.fetchData();
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
