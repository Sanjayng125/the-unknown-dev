import { NextResponse } from "next/server";
import { connectToDb } from "@/utils/db";
import { MyContacts } from "@/utils/modals";
import { auth } from "@/utils/auth";

export const PUT = async (req: Request) => {
    const session = await auth();

    if (!session) {
        return NextResponse.json({ success: false, message: "User not authenticated." });
    }

    try {
        await connectToDb();
        const { linkedin = "", twitter = "", github = "", instagram = "" } = await req.json();

        const contacts = {
            email: session?.user?.email,
            linkedin,
            twitter,
            github,
            instagram,
        };

        let res = await MyContacts.findOneAndUpdate(
            { email: session?.user?.email },
            contacts,
            { new: true }
        );

        if (!res) {
            res = await MyContacts.create(contacts);

            if (!res) {
                return NextResponse.json({ success: false, message: "Cannot update contacts!" });
            }
        }

        return NextResponse.json({ success: true, message: "Contacts updated!", contacts: res });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Something went wrong while updating contacts!" });
    }
};

export const GET = async () => {
    try {
        await connectToDb();

        const contacts = await MyContacts.find();

        if (contacts.length > 0) {
            return NextResponse.json({ success: true, contacts: contacts[0] });
        }

        return NextResponse.json({ success: false, message: "No contacts found." });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong while getting contacts!",
        });
    }
};