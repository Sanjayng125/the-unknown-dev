"use client";

import useDetailsStore from "@/context/mystore";
import React, { useState } from "react";
import Project from "./Project";
import { addProject, getMyProjects, removeProject } from "@/utils/actions";

const UpdateProject = () => {
  const [projectName, setProjectName] = useState("");
  const [projectGithub, setProjectGithub] = useState("");
  const [projectImg, setProjectImg] = useState("");
  const [projectVisitUrl, setProjectVisitUrl] = useState("");

  const { loading, setLoading, projects, setProjects } = useDetailsStore();

  const refreshProjects = async () => {
    try {
      const projects = await getMyProjects();
      if (projects?.success && projects?.projects?.length) {
        setProjects(projects.projects);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong while getting projects");
    }
  };

  const handleAddProject = async () => {
    setLoading(true);
    try {
      const res = await addProject(
        projectName,
        projectGithub,
        projectImg,
        projectVisitUrl
      );
      if (res?.success) {
        await refreshProjects();

        setProjectName("");
        setProjectGithub("");
        setProjectImg("");
        setProjectVisitUrl("");
      }
      alert(res?.message);
    } catch (error) {
      console.log(error);
      alert("Something went wrong while adding project");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveProject = async (id: string) => {
    try {
      setLoading(true);
      const res = await removeProject(id);
      if (res?.success) {
        await refreshProjects();
      }
      alert(res?.message);
    } catch (error) {
      console.log(error);
      alert("Something went wrong while removing project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col mt-5">
      <div className="flex items-center gap-2">
        <p className="text-xl font-bold">Add Project</p>
        <p className="text-sm">(* - Required Fields)</p>
      </div>

      <div className="flex flex-col gap-3">
        <input
          className="bg-gray-950 p-3 rounded-xl border"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Project Name *"
        />
        <input
          className="bg-gray-950 p-3 rounded-xl border"
          value={projectGithub}
          onChange={(e) => setProjectGithub(e.target.value)}
          placeholder="Github Url *"
        />
        <input
          className="bg-gray-950 p-3 rounded-xl border"
          value={projectImg}
          onChange={(e) => setProjectImg(e.target.value)}
          placeholder="Project Image Url *"
        />
        <input
          className="bg-gray-950 p-3 rounded-xl border"
          value={projectVisitUrl}
          onChange={(e) => setProjectVisitUrl(e.target.value)}
          placeholder="Project Visit Url"
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-xl w-max disabled:bg-opacity-50"
          onClick={handleAddProject}
          disabled={loading}
        >
          Add Project
        </button>
      </div>

      <div
        className={`${
          projects?.length > 0 ? "grid sm:grid-cols-2" : ""
        } gap-5 mt-5 w-full`}
      >
        {projects?.length > 0 &&
          projects.map((project, i) => (
            <Project
              project={project}
              edit={true}
              loading={loading}
              onRemove={handleRemoveProject}
              key={i}
            />
          ))}
        {!projects?.length && !loading && (
          <p className="text-center">Add your projects to see them here</p>
        )}
      </div>
    </div>
  );
};

export default UpdateProject;
