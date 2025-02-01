import { connectToDb } from '@/utils/db';
import { auth } from '@/utils/auth';
import { Details } from '@/utils/modals';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
    const { name, welcomeMsg, sub } = await req.json();
    const session = await auth();

    if (!session?.user) {
        console.log(session);

        return Response.json({ success: false, message: 'User not authenticated.' });
    }

    if (!name || !welcomeMsg || !sub) {
        return Response.json({ success: false, message: 'All fields are required!' });
    }

    try {
        await connectToDb();

        const res = await Details.findOneAndUpdate(
            { email: session.user.email },
            { name, welcomeMsg, sub },
            { new: true }
        );

        if (!res) {
            return Response.json({ success: false, message: 'Cannot update details!' });
        }

        return Response.json({ success: true, message: 'Details updated!', details: res });
    } catch (error) {
        console.error(error);
        return Response.json({ success: false, message: 'An error occurred while updating details.' });
    }
};

export const GET = async () => {
    try {
        await connectToDb();

        const details = await Details.find();

        if (details.length > 0) {
            return NextResponse.json({
                success: true,
                details: {
                    name: details[0].name,
                    welcomeMsg: details[0].welcomeMsg,
                    sub: details[0].sub
                }
            });
        }

        return NextResponse.json({ success: false, message: "No details found!" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Something went wrong while getting details!" });
    }
};
