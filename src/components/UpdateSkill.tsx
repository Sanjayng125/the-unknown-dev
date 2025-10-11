"use client";

import React, { useState } from "react";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import useDetailsStore from "@/context/mystore";
import {
  addSkill,
  getMySkills,
  removeSkill,
  updateSkillOrder,
} from "@/utils/actions";
import Skill from "./SkillBadge";

const UpdateSkill = () => {
  const [skill, setSkill] = useState("");
  const [skillLogoUrl, setSkillLogoUrl] = useState("");
  const { loading, setLoading, skills, setSkills } = useDetailsStore();

  const refreshSkills = async () => {
    try {
      setLoading(true);
      const skillsRes = await getMySkills();
      if (skillsRes?.success) {
        setSkills(skillsRes.skills);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = async () => {
    if (!skill) return alert("Please enter a skill name");
    try {
      setLoading(true);
      const res = await addSkill(skill, skillLogoUrl);
      if (res?.success) await refreshSkills();
      setSkill("");
      setSkillLogoUrl("");
      alert(res?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveSkill = async (id: string) => {
    try {
      setLoading(true);
      const res = await removeSkill(id);
      if (res?.success) await refreshSkills();
      alert(res?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = skills.findIndex((s) => s.order === active.id);
    const newIndex = skills.findIndex((s) => s.order === over.id);
    const newSkills = arrayMove(skills, oldIndex, newIndex);

    setSkills(newSkills);
    await updateSkillOrder(newSkills.map((s) => s._id));
  };

  return (
    <div className="flex flex-col mt-5">
      <p className="text-xl font-bold mb-3">Add Skill</p>
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

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToParentElement]}
      >
        <SortableContext
          items={skills.map((s) => s.order)}
          strategy={verticalListSortingStrategy}
        >
          <div className="mt-5 flex flex-wrap gap-2 sm:gap-5 bg-gray-900 p-3 rounded-xl justify-evenly">
            {skills?.length > 0 &&
              skills.map((skill) => (
                <Skill
                  key={skill.order}
                  skill={skill}
                  edit={true}
                  loading={loading}
                  onRemove={handleRemoveSkill}
                />
              ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default UpdateSkill;
