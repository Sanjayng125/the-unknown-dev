"use client";

import useDetailsStore from "@/context/mystore";
import { addSkill, getMySkills, removeSkill } from "@/utils/actions";
import React, { useState } from "react";
import Skill from "./SkillBadge";

const UpdateSkill = () => {
  const [skill, setSkill] = useState("");
  const [skillLogoUrl, setSkillLogoUrl] = useState("");
  const { loading, setLoading, skills, setSkills } = useDetailsStore();

  const refreshSkills = async () => {
    try {
      setLoading(true);
      const skills = await getMySkills();
      if (skills?.success && skills?.skills?.length) {
        setSkills(skills.skills);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong while getting skills");
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = async () => {
    if (!skill) {
      alert("Please enter a skill name");
      return;
    }

    try {
      setLoading(true);
      const res = await addSkill(skill, skillLogoUrl);
      if (res?.success) {
        await refreshSkills();

        setSkill("");
        setSkillLogoUrl("");
      }
      if (res?.message) {
        alert(res.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong while adding skill");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveSkill = async (id: string) => {
    try {
      setLoading(true);
      const res = await removeSkill(id);
      if (res?.success) {
        await refreshSkills();
      }
      alert(res?.message);
    } catch (error) {
      console.log(error);
      alert("Something went wrong while removing skill");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col mt-5">
      <div className="flex items-center gap-2">
        <p className="text-xl font-bold">Add Skill</p>
        <p className="text-sm">(* - Required Fields)</p>
      </div>

      <div className="flex flex-col gap-3">
        <input
          className="bg-gray-950 p-3 rounded-xl border"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          placeholder="Skill *"
        />
        <input
          className="bg-gray-950 p-3 rounded-xl border"
          value={skillLogoUrl}
          onChange={(e) => setSkillLogoUrl(e.target.value)}
          placeholder="Skill Logo Url"
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-xl w-max disabled:bg-opacity-50"
          onClick={handleAddSkill}
          disabled={loading}
        >
          Add Skill
        </button>
      </div>

      <div className="mt-5 flex flex-wrap gap-2 sm:gap-5 bg-gray-900 p-3 rounded-xl justify-evenly">
        {skills?.length > 0 &&
          skills.map((skill, i) => (
            <Skill
              skill={skill}
              edit={true}
              loading={loading}
              onRemove={handleRemoveSkill}
              key={i}
            />
          ))}
        {!skills?.length && !loading && (
          <p className="text-center">Add your skills to see them here</p>
        )}
      </div>
    </div>
  );
};

export default UpdateSkill;
