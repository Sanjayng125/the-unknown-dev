"use client";

import Loader from "@/components/Loader";
import Project from "@/components/Project";
import Skill from "@/components/Skill";
import useDetailsStore from "@/context/mystore";
import Image from "next/image";
import React, { useEffect } from "react";

const Page = () => {
  const store = useDetailsStore();

  const projectsRef = React.useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    projectsRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    store.fetchData();
  }, []);

  return (
    <div className="w-full h-full pt-5 px-2 sm:px-10 flex flex-col items-center relative">
      {store.loading && !store.name && <Loader />}
      {!store.loading && (
        <>
          <div className="flex md:h-[85vh] md:items-center">
            <div className="flex flex-col w-full">
              <h1 className="text-4xl sm:text-5xl font-semibold">
                {store?.welcomeMsg || (!store.loading && "Hey there! I'm")}{" "}
                <span className="text-purple-700">
                  {`${store?.name}` ||
                    (!store.loading && store.name === "" && "Your Name.")}
                </span>
              </h1>
              <p className="text-lg sm:text-xl mt-5">
                {store?.sub || (!store.loading && "About you")}
              </p>
              <button
                className="mt-5 bg-purple-700 w-max px-5 py-3 rounded-xl text-xl font-semibold"
                onClick={handleScroll}
              >
                Projects
              </button>
            </div>
            <div className="w-full flex justify-center items-center max-md:hidden">
              <Image
                src={"/bg.png"}
                alt="bg"
                width={500}
                height={500}
                className="w-3/4"
              />
            </div>
          </div>

          <div className="flex flex-col mt-10 w-full">
            <h1 className="text-4xl font-semibold text-center">My Skills</h1>

            <div className="w-full border-b-2 border-white py-3" />

            <div className="mt-5 flex flex-wrap gap-5 bg-gray-900 p-3 rounded-xl justify-evenly">
              {store?.skills?.length > 0 &&
                store.skills.map((skill, i) => <Skill skill={skill} key={i} />)}
              {!store?.skills?.length && !store.loading && (
                <p className="text-center">Add your skills to see them here</p>
              )}
            </div>
          </div>

          <div
            className="mt-10 flex flex-col items-center w-full"
            ref={projectsRef}
          >
            <h1 className="text-4xl font-semibold text-center">
              My Recent Projects
            </h1>

            <div className="w-full border-b-2 border-white py-3" />

            <div
              className={`${
                store?.projects?.length > 0 ? "grid sm:grid-cols-2" : ""
              } gap-5 mt-5 w-full`}
            >
              {store?.projects?.length > 0 &&
                store.projects.map((project, i) => (
                  <Project project={project} key={i} />
                ))}
              {!store?.projects?.length && !store.loading && (
                <p className="text-center">
                  Add your projects to see them here
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
