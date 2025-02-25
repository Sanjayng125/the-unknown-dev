import { SkillProps } from "@/types";
import React from "react";
import Skill from "./SkillBadge";

interface SkillsProps {
  skills: SkillProps[];
  loading: boolean;
}

const Skills = ({ skills, loading }: SkillsProps) => {
  return (
    <div className="flex flex-col mt-10 w-full">
      <h1 className="text-4xl font-semibold text-center">My Skills</h1>

      <div className="w-full border-b-2 border-white py-3" />

      <div className="mt-5 flex flex-wrap gap-2 sm:gap-5 bg-gray-900 p-2 sm:p-3 rounded-xl justify-evenly">
        {skills?.length > 0 &&
          skills.map((skill, i) => <Skill skill={skill} key={i} />)}
        {!skills?.length && !loading && (
          <p className="text-center">Add your skills to see them here</p>
        )}
      </div>
    </div>
  );
};

export default Skills;
