// middleware.js
import { NextResponse } from "next/server";
import { authenticate, restrictTo } from "./lib/auth";

async function checkAuth(req) {
  console.log("checkAuth called");
  try {
    const decoded = await authenticate(req.headers);
    console.log("Decoded JWT:", decoded);
    if (!decoded || !decoded.role) {
      throw new Error("Invalid user data");
    }
    return { decoded, response: NextResponse.next() };
  } catch (error) {
    console.log("Auth Error:", error.message);
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



// async function checkCartAuth(req) {
//   console.log("checkAuth called");
//   try {
//     const decoded = await authenticate(req.headers);
//     console.log("Decoded JWT:", decoded);
//     if (!decoded || !decoded.role) {
//       throw new Error("Invalid user data");
//     }
//     return { decoded, response: NextResponse.next() };
//   } catch (error) {
//     console.log("Auth Error:", error.message);
//     if (
//       error.message === "No token provided" ||
//       error.message === "Invalid token"
//     ) {
//       return {
//         decoded: null,
//         response: new Response("Unauthenticated", { status: 401 }),
//       };
//     }
//     return {
//       decoded: null,
//       response: new Response("Internal Server Error", { status: 500 }),
//     };
//   }
// }

async function adminDashboardMiddleware(req) {
  console.log("adminDashboardMiddleware called");
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

async function userDashboardMiddleware(req) {
  console.log("userDashboardMiddleware called");
  const { decoded, response } = await checkAuth(req);
  console.log("Response status:", response.status);
  if (!response.status || response.status !== 200) {
    console.log("Redirecting due to auth failure");
    return NextResponse.redirect(new URL("/user", req.url));
  }
  try {
    restrictTo(decoded, "user");
    return NextResponse.next();
  } catch (error) {
    console.log("user Role Error:", error.message);
    if (error.message === "Insufficient permissions") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
  }
}

async function cartMiddleware(req) {
  console.log("cartMiddleware called");
  const { decoded, response } = await checkAuth(req);
  console.log("Response status:", response.status);
  if (!response.status || response.status !== 200) {
    console.log("Redirecting due to auth failure");
    const url = new URL(`/user`, req.url);
    url.searchParams.set('callbackUrl', req.nextUrl.pathname); // Store the original URL as a query parameter

    console.log(url, 'bulded url')
    

    return NextResponse.redirect(url);

  }
  try {
    restrictTo(decoded, "user");
    return NextResponse.next();
  } catch (error) {
    console.log("user Role Error:", error.message);
    if (error.message === "Insufficient permissions") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
  }
}

export async function middleware(req) {
  console.log("Middleware triggered for:", req.url);
  console.log("Cookie:", req.headers.get("cookie"));

  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/user/")) {
    return await userDashboardMiddleware(req);
  } else if (pathname.startsWith("/admin/")) {
    return await adminDashboardMiddleware(req);
  } else if (pathname.startsWith("/cart")) {
    return await cartMiddleware(req);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*", "/user/dashboard/:path*", "/cart"],
};
