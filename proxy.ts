// middleware.ts (project root)
import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

// export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/admin/:path*",
    "/host(.*)",
  ],
};

export  default async function middleware(request: NextRequest) {
  const session = await getSession();
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/admin") && session?.role !== "admin") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/host") && session?.role !== "host") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

