import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { ACTIVE_PLAN_COOKIE_KEY, USER_COOKIE_KEY } from "./constant";
import {
  DASHBOARD_PAGE_PATH,
  LOGIN_PAGE_PATH,
  SIGNUP_PAGE_PATH,
} from "./pathNames";

const intlMiddleware = createMiddleware(routing);

export function middleware(req: NextRequest) {
  const { cookies } = req;
  const hasUserCookie = cookies.get(USER_COOKIE_KEY);
  const hasActivePlanCookie = cookies.get(ACTIVE_PLAN_COOKIE_KEY);
  const localeCookie = cookies.get("NEXT_LOCALE");
  const locale = localeCookie ? localeCookie.value : "en";

  if (
    // !hasUserCookie &&
    !hasActivePlanCookie &&
    req.nextUrl.pathname.includes(DASHBOARD_PAGE_PATH)
  ) {
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  } else if (
    hasUserCookie &&
    (req.nextUrl.pathname.includes(LOGIN_PAGE_PATH) ||
      req.nextUrl.pathname.includes(SIGNUP_PAGE_PATH))
  ) {
    return NextResponse.redirect(new URL(`/${locale}`, req.url));
  }

  return intlMiddleware(req);
}

export const config = {
  // Match only internationalized pathnames
  matcher: [
    "/",
    `/(en|es|fr|de|it|ja|ko|pl|pt|tr|vi|id|zh|th|da|nl|no|sv|ar|ru)/:path*`,
  ],
};
