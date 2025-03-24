import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import {
  ACTIVE_PLAN_COOKIE_KEY,
  AFFILIATE_USER_COOKIE_KEY,
  USER_COOKIE_KEY,
} from "./constant";
import {
  AFFILIATE_DASHBOARD_PAGE_PATH,
  AFFILIATE_FORGOT_PASSWORD_PAGE_PATH,
  AFFILIATE_LOGIN_PAGE_PATH,
  AFFILIATE_RESET_PASSWORD_PAGE_PATH,
  AFFILIATE_SIGNUP_PAGE_PATH,
  BILLING_DETAILS_PAGE_PATH,
  HOME_PAGE_PATH,
  LOGIN_PAGE_PATH,
  PRICING_PAGE_PATH,
  SIGNUP_PAGE_PATH,
} from "./pathNames";

const intlMiddleware = createMiddleware(routing);

export function middleware(req: NextRequest) {
  const { cookies } = req;
  const hasUserCookie = cookies.get(USER_COOKIE_KEY);
  const hasAffiliateUserCookie = cookies.get(AFFILIATE_USER_COOKIE_KEY);
  const hasActivePlanCookie = cookies.get(ACTIVE_PLAN_COOKIE_KEY);
  const localeCookie = cookies.get("NEXT_LOCALE");
  const locale = localeCookie ? localeCookie.value : "en";

  if (req.nextUrl.pathname.includes(AFFILIATE_DASHBOARD_PAGE_PATH)) {
    if (!hasAffiliateUserCookie) {
      return NextResponse.redirect(
        new URL(`/${locale}${AFFILIATE_LOGIN_PAGE_PATH}`, req.url)
      );
    }
  } else if (
    req.nextUrl.pathname.includes(AFFILIATE_LOGIN_PAGE_PATH) ||
    req.nextUrl.pathname.includes(AFFILIATE_SIGNUP_PAGE_PATH) ||
    req.nextUrl.pathname.includes(AFFILIATE_FORGOT_PASSWORD_PAGE_PATH) ||
    req.nextUrl.pathname.includes(AFFILIATE_RESET_PASSWORD_PAGE_PATH)
  ) {
    if (hasAffiliateUserCookie) {
      return NextResponse.redirect(
        new URL(`/${locale}${AFFILIATE_DASHBOARD_PAGE_PATH}`, req.url)
      );
    }
  } else if (req.nextUrl.pathname.includes(BILLING_DETAILS_PAGE_PATH)) {
    if (!hasUserCookie && !hasActivePlanCookie) {
      return NextResponse.redirect(
        new URL(`/${locale}${PRICING_PAGE_PATH}`, req.url)
      );
    }
  } else if (
    req.nextUrl.pathname.includes(LOGIN_PAGE_PATH) ||
    req.nextUrl.pathname.includes(SIGNUP_PAGE_PATH)
  ) {
    if (hasUserCookie) {
      return NextResponse.redirect(
        new URL(`${HOME_PAGE_PATH}${locale}`, req.url)
      );
    }
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
