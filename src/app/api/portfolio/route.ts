import { ContactProps, DetailsProps, ProjectProps, SkillProps } from "@/types";
import { connectToDb } from "@/utils/db";
import {
    Details,
    MyProject,
    MySkills,
    MyContacts,
    MyVisitCount,
} from "@/utils/modals";
import { NextResponse } from "next/server";

interface PortfolioData {
    details: DetailsProps | null;
    projects: ProjectProps[];
    skills: SkillProps[];
    contacts: ContactProps;
    visitCount: number;
}

export const GET = async () => {
    try {
        await connectToDb();

        const [details, projects, skills, contacts, visitCount] = await Promise.all([
            Details.findOne().lean<DetailsProps | null>(),
            MyProject.find().sort({ order: 1 }).lean<ProjectProps[]>(),
            MySkills.find().sort({ order: 1 }).lean<SkillProps[]>(),
            MyContacts.findOne().lean<ContactProps | null>(),
            MyVisitCount.findOne().lean<{ count: number } | null>(),
        ]);

        const data: PortfolioData = {
            details: details
                ? {
                    name: details.name,
                    welcomeMsg: details.welcomeMsg,
                    sub: details.sub,
                }
                : { name: "", welcomeMsg: "", sub: "" },

            projects: projects ?? [],
            skills: skills ?? [],
            contacts:
                contacts ?? {
                    email: "",
                    linkedin: "",
                    twitter: "",
                    github: "",
                    instagram: "",
                },
            visitCount: visitCount?.count ?? 0,
        };

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error("Error fetching portfolio data:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong while getting portfolio data!",
            },
            { status: 500 }
        );
    }
};
