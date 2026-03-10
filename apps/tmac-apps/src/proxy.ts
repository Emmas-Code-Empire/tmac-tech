import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { auth } from "./auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const loginUrl = new URL("/login", request.url);
  const errorUrl = (msg: string) => new URL(`/error?e=${msg}`, request.url);

  if (pathname.startsWith("/login") || pathname.startsWith("/error")) {
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

  if (user.email !== "cmml97xhz000004ic71vsx7i2")
    return NextResponse.redirect(
      errorUrl("Only emma is allowed to use this app. Go away.")
    );

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
