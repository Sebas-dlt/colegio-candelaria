/**
 * CSRF protection by validating Origin/Referer headers.
 * 
 * For a site hosted on Vercel with Supabase:
 * - SameSite=Lax cookies already protect most CSRF scenarios
 * - Origin/Referer validation adds an extra layer for state-changing requests
 */

const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  "https://colegiolacandelaria.edu.co",
  "https://www.colegiolacandelaria.edu.co",
];

export function validateOrigin(request: Request): boolean {
  // GET requests don't need CSRF protection
  if (request.method === "GET") {
    return true;
  }

  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  // Check Origin header first (preferred)
  if (origin) {
    return ALLOWED_ORIGINS.some((allowed) => origin.startsWith(allowed));
  }

  // Fallback to Referer header
  if (referer) {
    return ALLOWED_ORIGINS.some((allowed) => referer.startsWith(allowed));
  }

  // If neither Origin nor Referer is present, reject the request
  // (except for same-origin requests which may not include these headers)
  return false;
}

export function csrfGuard(request: Request): Response | null {
  if (!validateOrigin(request)) {
    return new Response(
      JSON.stringify({ error: "Solicitud no autorizada (CSRF)" }),
      {
        status: 403,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  return null;
}