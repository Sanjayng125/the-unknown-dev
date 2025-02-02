import { ProjectProps } from "@/types";
import { ArrowRight, ExternalLink } from "lucide-react";
import React from "react";

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
  return (
    <div className="flex flex-col items-center gap-2 border-2 p-2 rounded-xl max-w-[30rem]">
      <div className="w-full relative">
        <a href={project?.visitUrl || project?.visit || "/"} target="_blank">
          <div className="absolute bg-black bg-opacity-0 w-full h-full flex justify-center items-center hover:bg-opacity-50">
            <p className="text-xl font-semibold opacity-0 hover:opacity-100 w-full h-full flex justify-center items-center gap-2">
              Visit
              <ArrowRight />
            </p>
          </div>
          <img
            src={project?.img}
            alt={project.name}
            width={200}
            height={200}
            className="w-full aspect-video object-contain"
          />
        </a>
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="text-lg font-semibold truncate">{project.name}</p>
        {!edit ? (
          <a
            href={project?.github ?? "/"}
            target={project?.github ? "_blank" : ""}
            className="flex items-center gap-2 hover:text-purple-700"
          >
            Github <ExternalLink />
          </a>
        ) : (
          <button
            className="bg-red-500 hover:bg-opacity-50 p-2 rounded-xl disabled:bg-opacity-50"
            disabled={loading}
            onClick={() => onRemove && project?._id && onRemove(project._id)}
          >
            Remove
          </button>
        )}
      </div>
      {project?.description && (
        <p className="text-sm text-gray-500">{project.description}</p>
      )}
    </div>
  );
};

export default Project;
