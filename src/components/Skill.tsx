import { SkillProps } from "@/types";
import React from "react";
import { FaTrash } from "react-icons/fa";

const Skill = ({
  skill,
  edit = false,
  loading = false,
  onRemove,
}: {
  skill: SkillProps;
  edit?: boolean;
  loading?: boolean;
  onRemove?: (id: string) => void;
}) => {
  return (
    <span className="flex items-center gap-2">
      {!edit ? (
        <>
          <p className="text-lg font-semibold">{skill.name}</p>
          {skill.logoUrl && (
            <img
              src={skill.logoUrl}
              alt={skill.name}
              width={20}
              height={20}
              className="w-8 h-8"
            />
          )}
        </>
      ) : (
        <span className="flex items-center gap-2 border-2 p-2 rounded-xl border-white">
          <p className="text-lg font-semibold">{skill.name}</p>
          {skill.logoUrl && (
            <img
              src={skill.logoUrl}
              alt={skill.name}
              width={20}
              height={20}
              className="w-8 h-8"
            />
          )}
          <button
            className="p-1 text-lg disabled:bg-opacity-50 text-red-500 hover:text-red-700"
            disabled={loading}
            onClick={() => onRemove && skill?._id && onRemove(skill._id)}
          >
            <FaTrash />
          </button>
        </span>
      )}
    </span>
  );
};

export default Skill;
