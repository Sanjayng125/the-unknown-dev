import { NextResponse } from "next/server";
import { connectToDb } from "@/utils/db";
import { auth } from "@/utils/auth";
import { MySkills } from "@/utils/modals";

export const POST = async (req: Request) => {
    const session = await auth();

    if (!session) {
        return NextResponse.json({ success: false, message: "User not authenticated." });
    }

    try {
        const { name, logoUrl } = await req.json();

        if (!name) {
            return NextResponse.json({ success: false, message: "All fields are required!" });
        }

        await connectToDb();

        const skillCount = await MySkills.countDocuments();

        const skill = {
            name,
            logoUrl: logoUrl || "",
            order: skillCount,
        };

        const res = await MySkills.create(skill);

        if (!res) {
            return NextResponse.json({ success: false, message: "Cannot add skill!" });
        }

        return NextResponse.json({ success: true, message: "Skill added!" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Something went wrong while adding skill!" });
    }
};

export const PUT = async (req: Request) => {
    const session = await auth();

    if (!session) {
        return NextResponse.json({ success: false, message: "User not authenticated." });
    }

    try {
        const { skillIds }: { skillIds: string[] } = await req.json();

        if (!skillIds || skillIds.length === 0) {
            return NextResponse.json({ success: false, message: "Bad request!" });
        }

        await connectToDb();

        await Promise.all(
            skillIds.map((id, index) => MySkills.findByIdAndUpdate(id, { order: index }))
        )

        return NextResponse.json({ success: true, message: "Skills order updated!" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Something went wrong while adding skill!" });
    }
};


export const DELETE = async (req: Request) => {
    const session = await auth();

    if (!session) {
        return NextResponse.json({ success: false, message: "User not authenticated." });
    }

    try {
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ success: false, message: "All fields are required!" });
        }

        await connectToDb();
        await MySkills.findByIdAndDelete(id);

        return NextResponse.json({ success: true, message: "Skill removed!" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Something went wrong while removing skill!" });
    }
};


export const GET = async () => {
    try {
        await connectToDb();

        const skills = await MySkills.find().sort({ order: 1 });

        return NextResponse.json({ success: true, skills });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong while getting skills!",
        });
    }
};