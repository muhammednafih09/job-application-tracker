import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/auth/auth";

export default async function proxy(resquest: NextRequest) {
  const session = await getSession();

  const isDashboardPage = resquest.nextUrl.pathname.startsWith("/dashboard");

  if (isDashboardPage && !session?.user) {
    return NextResponse.redirect(new URL("/sign-in", resquest.url));
  }

  return NextResponse.next();
}
