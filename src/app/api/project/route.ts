import { NextResponse } from 'next/server';
import { connectToDb } from '@/utils/db';
import { auth } from '@/utils/auth';
import { MyProject } from '@/utils/modals';

export const POST = async (req: Request) => {
    const session = await auth()

    if (!session) {
        return NextResponse.json({ success: false, message: 'User not authenticated.' });
    }

    try {
        const { name, github, img, visitUrl = "", description } = await req.json();

        if (!name || !github || !img || !description) {
            return NextResponse.json({ success: false, message: 'All fields are required!' });
        }

        await connectToDb();

        const project = await MyProject.create({ name, github, img, visitUrl, description });

        if (!project) {
            return NextResponse.json({ success: false, message: 'Cannot add project!' });
        }

        return NextResponse.json({ success: true, message: 'Project added!' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Something went wrong while adding project!' });
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
            return NextResponse.json({ success: false, message: "Project ID is required!" });
        }

        await connectToDb();

        const res = await MyProject.findOneAndDelete({ _id: id });

        if (!res) {
            return NextResponse.json({ success: false, message: "Cannot remove project!" });
        }

        return NextResponse.json({ success: true, message: "Project removed!" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Something went wrong while removing project!" });
    }
};

export const GET = async () => {
    try {
        await connectToDb();

        const projects = await MyProject.find()

        return NextResponse.json({ success: true, projects });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong while getting projects!",
        });
    }
};