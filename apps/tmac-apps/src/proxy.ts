import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { auth } from "./auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const appUrl = new URL("/apps", request.url);
  const loginUrl = new URL("/login", request.url);
  const errorUrl = (msg: string) => new URL(`/error?e=${msg}`, request.url);

  if (
    pathname.startsWith("/_next") ||
    pathname.includes("/api/") ||
    pathname.includes(".") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/error")
  ) {
    return NextResponse.next();
  }

  let session;

  try {
    session = await auth();
  } catch (e) {
    return NextResponse.redirect(errorUrl("Session Fetch Failed"));
  }

  if (!session || !session.user) return NextResponse.redirect(loginUrl);

  const user = session.user;

  if (user.id !== "cmmlfakr8000004jrfb3etuhl")
    return NextResponse.redirect(
      errorUrl("Only emma is allowed to use this app. Go away.")
    );

  return NextResponse.rewrite(appUrl);
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.well-known).*)"],
};
