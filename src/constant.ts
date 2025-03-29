export const DEFAULT_BRAND_NAME = "John Doe";
export const DEFAULT_BRAND_HANDLE = "https://carouselbuilder.io";
export const DEFAULT_BRAND_IMAGE_SRC = "/john.jpg";

export const USER_COOKIE_KEY = "carousel_builder_user";
export const ACTIVE_PLAN_COOKIE_KEY = "carousel_builder_active_plan";
export const AFFILIATE_USER_COOKIE_KEY = "carousel_builder_affiliate_user";

export const GOOGLE_API_GET_USER_INFO =
  "https://www.googleapis.com/oauth2/v3/userinfo";

export const GOOGLE_OAUTH_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID!;

export const STRIPE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
export const STRIPE_SECRET_KEY = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!;

export const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY!;

export const OPENAI_API_ENDPOINT = "https://api.openai.com/v1/chat/completions";

export const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL!;

export const TERMS_AND_CONDITIONS_AND_PRIVACY_POLICY_ROUTE = `${BACKEND_API_URL}/options`;
export const LOGIN_ROUTE = `${BACKEND_API_URL}/auth/google`;
export const LOGOUT_ROUTE = `${BACKEND_API_URL}/logout`;
export const GET_USER_ROUTE = `${BACKEND_API_URL}/user`;
export const PUT_AI_GENERATED_CAROUSELS_ROUTE = `${BACKEND_API_URL}/user/ai-creations`;

export const GET_BLOGS_ROUTE = `${BACKEND_API_URL}/blogs`;
export const GET_PLANS_ROUTE = `${BACKEND_API_URL}/plans`;
export const GET_ACTIVE_PURCHASE_PLAN_ROUTE = `${BACKEND_API_URL}/purchase/active`;
export const GET_PURCHASED_PLANS_HISTORY_ROUTE = `${BACKEND_API_URL}/purchase/history`;
export const ADD_PURCHASE_PLAN_ROUTE = `${BACKEND_API_URL}/purchase/add`;

export const GET_CAROUSELS_ROUTE = `${BACKEND_API_URL}/carousels`;
export const GET_CAROUSEL_BY_ID_ROUTE = (carouselId: number) =>
  `${BACKEND_API_URL}/carousel/${carouselId}`;
export const SAVE_CAROUSEL_ROUTE = `${BACKEND_API_URL}/carousel`;
export const DELETE_CAROUSEL_ROUTE = `${BACKEND_API_URL}/carousel/delete`;
export const UPLOAD_IMAGE_ROUTE = `${BACKEND_API_URL}/image/upload`;

export const POST_APPLY_REFERRAL_CODE_ROUTE = `${BACKEND_API_URL}/apply-referral`;
export const AFFILIATE_LOGIN_ROUTE = `${BACKEND_API_URL}/affiliate/login`;
export const AFFILIATE_LOGOUT_ROUTE = `${BACKEND_API_URL}/affiliate/logout`;
export const AFFILIATE_SIGNUP_ROUTE = `${BACKEND_API_URL}/affiliate/apply`;
export const AFFILIATE_FORGOT_PASSWORD_ROUTE = `${BACKEND_API_URL}/reset-password`;
export const AFFILIATE_RESET_PASSWORD_ROUTE = `${BACKEND_API_URL}/reset-password`;
export const GET_AFFILIATE_STATS_ROUTE = `${BACKEND_API_URL}/affiliate/stats`;
export const GET_AFFILIATE_INVITED_USERS_ROUTE = `${BACKEND_API_URL}/affiliate/invited-users`;
export const GET_AFFILIATE_EARNINGS_HISTORY_ROUTE = `${BACKEND_API_URL}/affiliate/earnings`;
export const GET_AFFILIATE_WITHDRAWALS_HISTORY_ROUTE = `${BACKEND_API_URL}/withdrawals/history`;
export const POST_AFFILIATE_WITHDRAWAL_REQUEST_ROUTE = `${BACKEND_API_URL}/withdrawal/request`;
export const POST_AFFILIATE_ADD_PAYPAL_ACCOUNT_ROUTE = `${BACKEND_API_URL}/withdrawal/paypal`;
