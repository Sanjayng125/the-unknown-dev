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
    getPortfolioData,
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
                try {
                    set({ loading: true });

                    const portfolioData = await getPortfolioData();

                    // console.log(portfolioData);

                    if (portfolioData?.success) {

                        const { details, projects, skills, contacts, visitCount } = portfolioData.data;

                        set({
                            name: details.name,
                            welcomeMsg: details.welcomeMsg,
                            sub: details.sub,
                            projects: projects,
                            skills: skills,
                            contacts: contacts,
                            visitCount: visitCount,
                        });
                    }
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
