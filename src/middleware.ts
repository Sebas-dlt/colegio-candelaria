import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  "https://colegiolacandelaria.edu.co",
  "https://www.colegiolacandelaria.edu.co",
];

function validateOrigin(request: NextRequest): boolean {
  // GET requests don't need CSRF protection
  if (request.method === "GET") {
    return true;
  }

  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  if (origin) {
    return ALLOWED_ORIGINS.some((allowed) => origin.startsWith(allowed));
  }

  if (referer) {
    return ALLOWED_ORIGINS.some((allowed) => referer.startsWith(allowed));
  }

  return false;
}

export async function middleware(request: NextRequest) {
  // CSRF protection for API routes (state-changing methods)
  if (
    request.nextUrl.pathname.startsWith("/api") &&
    !validateOrigin(request)
  ) {
    return NextResponse.json(
      { error: "Solicitud no autorizada (CSRF)" },
      { status: 403 }
    );
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
