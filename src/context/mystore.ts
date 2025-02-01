"use client"

import { MyDetailsProps } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getMyContacts, getMyDetails, getMyProjects, getMySkills } from "@/utils/actions";

const useDetailsStore = create<MyDetailsProps>()(
    persist(
        (set, get) => ({
            name: "",
            welcomeMsg: "",
            sub: "",
            projects: [],
            skills: [],
            contacts: {
                email: "",
                linkedin: "",
                twitter: "",
                github: "",
                instagram: "",
            },
            loading: true,

            setDetails: (details) => set({ name: details.name, welcomeMsg: details.welcomeMsg, sub: details.sub }),
            setProjects: (projects) => set({ projects }),
            setSkills: (skills) => set({ skills }),
            setContacts: (contacts) => set({ contacts }),
            setLoading: (state) => set({ loading: state }),

            fetchData: async () => {
                const state = get();

                try {
                    set({ loading: true });

                    const details = await getMyDetails();
                    const projects = await getMyProjects();
                    const skills = await getMySkills();
                    const contacts = await getMyContacts();

                    set({
                        name: details?.details?.name || state.name,
                        welcomeMsg: details?.details?.welcomeMsg || state.welcomeMsg,
                        sub: details?.details?.sub || state.sub,
                        projects: projects?.projects && projects.projects.length > 0 ? projects.projects : state.projects,
                        skills: skills?.skills && skills.skills.length > 0 ? skills.skills : state.skills,
                        contacts: contacts?.contacts || state.contacts,
                    });
                } catch (error) {
                    console.error("Failed to fetch details:", error);
                } finally {
                    set({ loading: false });
                }
            },
        }),
        {
            name: "my-details", // Key for localStorage
        }
    )
);

export default useDetailsStore;
