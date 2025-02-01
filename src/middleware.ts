import { auth } from "@/utils/auth"

export default auth((req) => {
    if (!req.auth?.user && req.nextUrl.pathname === "/edit") {
        const newUrl = new URL("/login", req.nextUrl.origin)
        return Response.redirect(newUrl)
    }

    if (req.auth?.user && req.nextUrl.pathname === "/login") {
        const newUrl = new URL("/", req.nextUrl.origin)
        return Response.redirect(newUrl)
    }
})