import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only handle root path
  if (pathname !== "/") return NextResponse.next();

  // Respect manual language choice (cookie)
  const locale = request.cookies.get("locale")?.value;
  if (locale === "ja") return NextResponse.redirect(new URL("/ja", request.url));
  if (locale === "zh") return NextResponse.redirect(new URL("/zh", request.url));
  if (locale === "en") return NextResponse.next();

  // Geo detection (Vercel provides request.geo)
  const country = request.geo?.country;
  if (country === "JP") return NextResponse.redirect(new URL("/ja", request.url));
  if (country === "CN" || country === "TW" || country === "HK")
    return NextResponse.redirect(new URL("/zh", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
