import { NextRequest, NextResponse } from "next/server";

function redirectWithCookie(url: URL, locale: string) {
  const response = NextResponse.redirect(url);
  response.cookies.set("locale", locale, { path: "/", maxAge: 60 * 60 * 24 * 365 });
  return response;
}

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Handle ?lang= param on any page (for ad URLs)
  const langParam = searchParams.get("lang");
  if (langParam && ["ja", "zh", "en"].includes(langParam)) {
    const response = NextResponse.next();
    response.cookies.set("locale", langParam, { path: "/", maxAge: 60 * 60 * 24 * 365 });
    return response;
  }

  // Only redirect on root path
  if (pathname !== "/") return NextResponse.next();

  // Respect manual language choice (cookie)
  const locale = request.cookies.get("locale")?.value;
  if (locale === "ja") return redirectWithCookie(new URL("/ja", request.url), "ja");
  if (locale === "zh") return redirectWithCookie(new URL("/zh", request.url), "zh");
  if (locale === "en") return NextResponse.next();

  // Geo detection (Vercel provides request.geo)
  const country = request.geo?.country;
  if (country === "JP") return redirectWithCookie(new URL("/ja", request.url), "ja");
  if (country === "CN" || country === "TW" || country === "HK")
    return redirectWithCookie(new URL("/zh", request.url), "zh");

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/apply", "/apply/thanks"],
};
