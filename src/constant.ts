export const DEFAULT_BRAND_NAME = "John Doe";
export const DEFAULT_BRAND_HANDLE = "https://carouselbuilder.io";
export const DEFAULT_BRAND_IMAGE_SRC = "/john.jpg";

export const TOKEN_LOCAL_STORAGE_KEY = "CAROUSEL_BUILDER_USER";

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

export const LOGIN_ROUTE = `${BACKEND_API_URL}/auth/google`;
export const LOGOUT_ROUTE = `${BACKEND_API_URL}/logout`;
export const GET_USER_ROUTE = `${BACKEND_API_URL}/user`;

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
