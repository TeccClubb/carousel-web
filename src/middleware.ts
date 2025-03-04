import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", `/(en|es|fr|de|it|ja|ko|pl|pt|tr|vi|id|zh|th|da|nl|no|sv|ar|ru)/:path*`],
};
