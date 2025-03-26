// middleware.js (in project root)
import { NextResponse } from "next/server";
import { authenticate, restrictTo } from "./lib/auth";

// Shared authentication middleware
async function checkAuth(req) {
  try {
    const decoded = await authenticate(req.headers); // Now async
    if (!decoded || !decoded.role) {
      throw new Error("Invalid user data");
    }
    return { decoded, response: NextResponse.next() };
  } catch (error) {
    if (
      error.message === "No token provided" ||
      error.message === "Invalid token"
    ) {
      return {
        decoded: null,
        response: NextResponse.redirect(new URL("/user", req.url)),
      };
    }
    return {
      decoded: null,
      response: new Response("Internal Server Error", { status: 500 }),
    };
  }
}

// Admin dashboard middleware
async function adminDashboardMiddleware(req) {
  const { decoded, response } = await checkAuth(req);
  if (!response.status || response.status !== 200) return response;

  try {
    restrictTo(decoded, "admin");
    return NextResponse.next();
  } catch (error) {
    console.log("Admin Role Error:", error.message);
    if (error.message === "Insufficient permissions") {
      return NextResponse.redirect(new URL("/user/dashboard", req.url));
    }
    return new Response("Internal Server Error", { status: 500 });
  }
}

// User dashboard middleware
async function userDashboardMiddleware(req) {
  const { decoded, response } = await checkAuth(req);
  if (!response.status || response.status !== 200) return response;

  // No role restriction; just ensure authenticated
  return NextResponse.next();
}

// Main middleware
export async function middleware(req) {
  console.log("Middleware triggered for:", req.url);
  console.log("Cookie:", req.headers.get("cookie"));

  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/admin/")) {
    return await adminDashboardMiddleware(req);
  } else if (pathname.startsWith("/user/")) {
    return await userDashboardMiddleware(req);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
