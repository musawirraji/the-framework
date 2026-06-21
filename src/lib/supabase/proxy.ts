import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { publicEnv, hasSupabaseEnv } from "@/lib/env";

/**
 * Refreshes the auth session cookie on every request and gates protected routes.
 * Called from the root `proxy.ts` (Next.js 16; formerly `middleware.ts`).
 *
 * Uses getClaims() — it validates the JWT signature against the project's
 * published public keys locally, so it is safe to trust in the proxy
 * (unlike getSession(), which is not verified).
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  if (!hasSupabaseEnv) return response;

  const supabase = createServerClient(
    publicEnv.NEXT_PUBLIC_SUPABASE_URL,
    publicEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const { data } = await supabase.auth.getClaims();
  const isAuthed = !!data?.claims;

  const { pathname } = request.nextUrl;
  const isAppRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/weddings") ||
    pathname.startsWith("/billing");
  const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/signup");

  if (isAppRoute && !isAuthed) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthRoute && isAuthed) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return response;
}
