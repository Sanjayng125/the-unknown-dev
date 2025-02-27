import { connectToDb } from "@/utils/db";
import { MyVisitCount } from "@/utils/modals";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await connectToDb();

        const visitCount = await MyVisitCount.findOne().select("count");

        if (visitCount) {
            return NextResponse.json({ success: true, visitCount });

        }

        return NextResponse.json({ success: true, visitCount: { count: 0 } });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong while getting visit count!",
        });
    }
};

export const POST = async () => {
    try {
        await connectToDb();

        let visitCount = await MyVisitCount.findOne().select("count");

        if (!visitCount) {
            visitCount = await MyVisitCount.create({ count: 1 })
            if (!visitCount) {
                return NextResponse.json({ success: false });
            }
        } else {
            visitCount.count += 1;
            await visitCount.save()
        }

        return NextResponse.json({ success: true, visitCount });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong while updating visit count!",
        });
    }
};