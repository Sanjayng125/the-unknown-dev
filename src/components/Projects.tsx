import { ProjectProps } from "@/types";
import React, { Ref } from "react";
import Project from "./ProjectCard";

interface ProjectsProps {
  projects: ProjectProps[];
  loading: boolean;
  projectsRef: Ref<HTMLDivElement>;
}

const Projects = ({ projects, loading, projectsRef }: ProjectsProps) => {
  return (
    <div className="mt-10 flex flex-col items-center w-full" ref={projectsRef}>
      <h1 className="text-4xl font-semibold text-center">My Recent Projects</h1>

      <div className="w-full border-b-2 border-white py-3" />

      <div
        className={`${
          projects?.length > 0
            ? "grid sm:grid-cols-2 place-content-center lg:grid-cols-3"
            : ""
        } gap-5 mt-5 w-full`}
      >
        {projects?.length > 0 &&
          projects.map((project, i) => <Project project={project} key={i} />)}
        {!projects?.length && !loading && (
          <p className="text-center">Add your projects to see them here</p>
        )}
      </div>
    </div>
  );
};

export default Projects;
