import { useCookies } from "react-cookie";
import { USER_COOKIE_KEY, ACTIVE_PLAN_COOKIE_KEY } from "@/constant";
import { User } from "@/types";
import { ActivePlan } from "@/types/plans.state";

export const useUserCookie = () => {
  const [userCookie, setCookie, removeCookie] = useCookies([USER_COOKIE_KEY]);

  const user: User = userCookie.carousel_builder_user ?? null;

  const setUserCookie = (user: User) => {
    setCookie(USER_COOKIE_KEY, JSON.stringify(user), {
      path: "/",
      maxAge: 60 * 60 * 24 * 1, // 1 day
      secure: true,
      sameSite: "strict",
    });
  };

  const removeUserCookie = () => {
    removeCookie(USER_COOKIE_KEY);
  };

  return { user, setUserCookie, removeUserCookie } as const;
};

export const useActivePlanCookie = () => {
  const [activePlanCookie, setCookie, removeCookie] = useCookies([
    ACTIVE_PLAN_COOKIE_KEY,
  ]);

  const activePlan: ActivePlan =
    activePlanCookie.carousel_builder_active_plan ?? null;

  const setActivePlanCookie = (activePlan: ActivePlan) => {
    setCookie(ACTIVE_PLAN_COOKIE_KEY, JSON.stringify(activePlan), {
      path: "/",
      maxAge: 60 * 60 * 24 * 1, // 1 day
      secure: true,
      sameSite: "strict",
    });
  };

  const removeActivePlanCookie = () => {
    removeCookie(ACTIVE_PLAN_COOKIE_KEY);
  };

  return { activePlan, setActivePlanCookie, removeActivePlanCookie } as const;
};
