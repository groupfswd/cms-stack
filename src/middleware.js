import { NextResponse } from "next/server";

export function middleware(request) {
  const loginPath = ["/login"]
  const accessToken = request.cookies.get("accessToken")

  if (loginPath.some((v) => v === request.nextUrl.pathname)) {
    if (accessToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } else {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/login",
    "/",
    "/category:function*",
    "/order:function*",
    "/product:function*",
    "/store:function*",
    "/user:function*",
  ],
};
