import Image from "next/image";
import React, { RefObject } from "react";
import { FaGithub } from "react-icons/fa";

interface HeroProps {
  projectsRef: RefObject<HTMLDivElement | null>;
  welcomeMsg: string;
  name: string;
  sub: string;
  github: string;
  loading: boolean;
}

const Hero = ({
  name,
  welcomeMsg,
  sub,
  projectsRef,
  github,
  loading,
}: HeroProps) => {
  const handleScroll = () => {
    projectsRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex md:h-[85vh] md:items-center">
      <div className="flex flex-col w-full">
        <h1 className="text-4xl sm:text-5xl font-semibold">
          {welcomeMsg || (!loading && "Hey there! I'm")}{" "}
          <span className="text-purple-700">
            {`${name}` || (!loading && name === "" && "Your Name.")}
          </span>
        </h1>
        <p className="text-lg sm:text-xl mt-5">
          {sub || (!loading && "About you")}
        </p>
        <div className="flex items-center gap-2">
          <button
            className="mt-5 bg-purple-700 w-max px-5 py-3 rounded-xl text-xl font-semibold"
            onClick={handleScroll}
          >
            Projects
          </button>
          {github && (
            <a
              className="mt-5 bg-gray-900 border-2 w-max px-5 py-3 rounded-xl text-xl font-semibold flex items-center gap-2"
              href={github || ""}
              target="_blank"
            >
              <span>Github</span>
              <FaGithub />
            </a>
          )}
        </div>
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
  );
};

export default Hero;
