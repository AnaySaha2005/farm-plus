import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getSession } from "./helper/getSession";
import { decrypt } from "./lib/jwt";
export async function middleware(request: NextRequest) {
  const session = await getSession();
  if (request.nextUrl.pathname === "/dashboard") {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
    const data = await decrypt(session.value);
    return NextResponse.redirect(
      new URL("/dashboard/" + data.role, request.nextUrl)
    );
  }
  if (request.nextUrl.pathname === "/dashboard/trader") {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
    const data = await decrypt(session.value);
    if(data.role==="farmer")
    return NextResponse.redirect(
      new URL("/dashboard/" + data.role, request.nextUrl)
    );
  }
  if (request.nextUrl.pathname === "/dashboard/farmer") {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
    const data = await decrypt(session.value);
    if (data.role === "trader")
      return NextResponse.redirect(
        new URL("/dashboard/" + data.role, request.nextUrl)
      );
  }

  if (request.nextUrl.pathname.includes("/dashboard") && !session)
    return NextResponse.redirect(new URL("/login", request.nextUrl));


  if (request.nextUrl.pathname === "/sell") {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
    const data = await decrypt(session?.value);
    if (data.role == "trader")
      return NextResponse.redirect(new URL("/buy", request.nextUrl));
  }

  if (request.nextUrl.pathname === "/buy") {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
    const data = await decrypt(session?.value);
    if (data.role == "farmer")
      return NextResponse.redirect(new URL("/sell", request.nextUrl));
  }

  if (request.nextUrl.pathname.includes("/listing")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
  }
  if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup'){
    if(session)return NextResponse.redirect(new URL('/dashboard',request.nextUrl))
  }
}
