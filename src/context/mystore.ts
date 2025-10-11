"use client";

import { MyDetailsProps } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
    getMyContacts,
    getMyDetails,
    getMyProjects,
    getMySkills,
    getMyVisitCount,
} from "@/utils/actions";

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
            visitCount: 0,
            loading: false,

            setDetails: (details) =>
                set({
                    name: details.name,
                    welcomeMsg: details.welcomeMsg,
                    sub: details.sub,
                }),
            setProjects: (projects) => set({ projects }),
            setSkills: (skills) => set({ skills }),
            setContacts: (contacts) => set({ contacts }),
            setLoading: (state) => set({ loading: state }),

            fetchData: async () => {
                const state = get();
                try {
                    set({ loading: true });

                    const [details, projects, skills, visitCount, contacts] =
                        await Promise.all([
                            getMyDetails(),
                            getMyProjects(),
                            getMySkills(),
                            getMyVisitCount(),
                            getMyContacts(),
                        ]);

                    set({
                        name: details?.details?.name || state.name,
                        welcomeMsg: details?.details?.welcomeMsg || state.welcomeMsg,
                        sub: details?.details?.sub || state.sub,
                        projects:
                            projects?.projects?.length > 0
                                ? projects.projects
                                : state.projects,
                        skills:
                            skills?.skills?.length > 0 ? skills.skills : state.skills,
                        visitCount: visitCount?.count || state.visitCount,
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
            name: "details-storage",
            partialize: (state) =>
                Object.fromEntries(
                    Object.entries(state).filter(
                        ([key]) =>
                            ![
                                "loading",
                                "setDetails",
                                "setProjects",
                                "setSkills",
                                "setContacts",
                                "setLoading",
                                "fetchData",
                            ].includes(key)
                    )
                ),
        }
    )
);

export default useDetailsStore;
