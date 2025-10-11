import { SkillProps } from "@/types";
import React from "react";
import { FaTrash } from "react-icons/fa";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: skill.order,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: edit ? "grab" : "default",
  };

  return (
    <span
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`flex items-center gap-2 ${
        edit ? "border sm:border-2 rounded-xl border-white p-2 bg-gray-800" : ""
      }`}
    >
      <p className="text-sm sm:text-lg font-semibold">{skill?.name}</p>

      {skill?.logoUrl && (
        <img
          src={skill.logoUrl}
          alt={skill.name}
          width={20}
          height={20}
          className="w-6 h-6 sm:w-8 sm:h-8"
        />
      )}

      {edit && (
        <button
          className="p-1 text-lg text-red-500 hover:text-red-700 disabled:opacity-50"
          disabled={loading}
          onClick={() => onRemove && skill?._id && onRemove(skill._id)}
        >
          <FaTrash />
        </button>
      )}
    </span>
  );
};

export default Skill;
