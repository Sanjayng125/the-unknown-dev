import { NextResponse } from 'next/server';
import { connectToDb } from '@/utils/db';
import { User } from '@/utils/modals';

export const POST = async (req: Request) => {
    try {
        const { email, password } = await req.json();

        await connectToDb();

        const user = await User.findOne({ email: email });

        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials.', success: false }, { status: 400 });
        }

        const isPasswordCorrect = (password === user.password)

        if (!isPasswordCorrect) {
            return NextResponse.json({ error: 'Invalid password.', success: false }, { status: 400 });
        }

        return NextResponse.json({ user, success: true }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
};
