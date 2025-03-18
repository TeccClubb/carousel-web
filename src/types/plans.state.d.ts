export type Plan = {
  description: string;
  duration: number;
  duration_unit: string;
  id: number;
  name: string;
  price: number;
  slug: string;
  isBestPrice: boolean;
};

export type ActivePlan = {
  id: number;
  amount_paid: string;
  start_date: string;
  end_date: string;
  status: "active" | "cancelled" | "expired";
};

export type PlansState = {
  isPlansLoadedOnce: boolean;
  plans: Plan[];
};
