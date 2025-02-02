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
  const [projectDescription, setProjectDescription] = useState("");

  const { loading, setLoading, projects, setProjects } = useDetailsStore();

  const refreshProjects = async () => {
    try {
      setLoading(true);
      const res = await getMyProjects();

      if (res?.success) {
        setProjects(res.projects);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong while getting projects");
    } finally {
      setLoading(false);
    }
  };

  const handleAddProject = async () => {
    setLoading(true);
    try {
      const res = await addProject(
        projectName,
        projectGithub,
        projectImg,
        projectVisitUrl,
        projectDescription
      );
      if (res?.success) {
        await refreshProjects();

        setProjectName("");
        setProjectGithub("");
        setProjectImg("");
        setProjectDescription("");
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
        <textarea
          className="bg-gray-950 p-3 rounded-xl border resize-none"
          rows={4}
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          placeholder="Project Description *"
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
          projects?.length > 0
            ? "grid sm:grid-cols-2  place-content-center lg:grid-cols-3 border-t-2 pt-3"
            : ""
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
