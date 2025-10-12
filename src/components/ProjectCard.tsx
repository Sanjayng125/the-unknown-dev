import { ProjectProps } from "@/types";
import { ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Project = ({
  project,
  edit = false,
  loading = false,
  onRemove,
}: {
  project: ProjectProps;
  edit?: boolean;
  loading?: boolean;
  onRemove?: (id: string) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: project.order,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: edit ? "grab" : "default",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex flex-col items-center gap-2 border-2 p-2 rounded-xl max-w-[30rem] bg-gray-800 hover:bg-gray-700 transition-colors"
    >
      <div className="w-full relative">
        <a
          href={project?.visitUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
        >
          {project?.visitUrl && (
            <div className="absolute bg-black bg-opacity-0 w-full h-full flex justify-center items-center hover:bg-opacity-50 transition">
              <p className="text-xl font-semibold opacity-0 hover:opacity-100 w-full h-full flex justify-center items-center gap-2">
                Visit
                <ArrowRight />
              </p>
            </div>
          )}
          <Image
            src={project?.img}
            alt={project.name}
            width={200}
            height={200}
            className="w-full aspect-video object-contain rounded-md"
          />
        </a>
      </div>

      <div className="flex items-center justify-between w-full">
        <p className="text-lg font-semibold truncate">{project.name}</p>

        {!edit ? (
          <a
            href={project?.github ?? "/"}
            target={project?.github ? "_blank" : ""}
            className="flex items-center gap-2 hover:text-purple-500"
          >
            Github <ExternalLink size={16} />
          </a>
        ) : (
          <button
            className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-xl disabled:bg-opacity-50"
            disabled={loading}
            onClick={() => onRemove && project?._id && onRemove(project._id)}
          >
            Remove
          </button>
        )}
      </div>

      {project?.description && (
        <p className="text-sm text-gray-400">{project.description}</p>
      )}
    </div>
  );
};

export default Project;
