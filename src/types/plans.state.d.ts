export type Plan = {
  description: string;
  duration: number;
  duration_unit: string;
  id: number;
  name: string;
  price: number;
  slug: string;
};

export type PlansState = {
  isPlansLoadedOnce: boolean;
  plans: Plan[];
};
