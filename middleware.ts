import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import config from "./config";

// Create route matcher for protected routes
const protectedRoutes = [
  "/dashboard(.*)",
  "/api/((?!webhooks).)*", // Protect all API routes except webhooks
];

const isProtectedRoute = config.auth.enabled
  ? createRouteMatcher(protectedRoutes)
  : () => false;

// Middleware handler based on auth configuration
const middlewareHandler = config.auth.enabled
  ? clerkMiddleware((auth, req) => handleAuth(auth, req))
  : (req) => NextResponse.next();

async function handleAuth(auth: any, req: Request) {
  const resolvedAuth = await auth();
  
  // Check for protected routes
  if (!resolvedAuth.userId && isProtectedRoute(req)) {
    return resolvedAuth.redirectToSignIn({
      returnBackUrl: req.url,
    });
  }

  const response = NextResponse.next();

  // Add security headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), browsing-topics=()"
  );

  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
  }

  return response;
}

export default middlewareHandler;

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
    "/api/(.*)",
  ],
};