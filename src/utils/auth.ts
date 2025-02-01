import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { login } from "./actions"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                try {
                    if (!credentials.email || !credentials.password) {
                        throw new Error("All fields are required!")
                    }

                    const res = await login(credentials.email as string, credentials.password as string)

                    console.log(res);


                    if (!res?.success) {
                        throw new Error("Invalid Credentials!")
                    }

                    return res.user
                } catch (error) {
                    console.log(error)
                }
            },
        }),
    ],
})