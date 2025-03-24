export type AffiliateUser = {
  name: string;
  email: string;
  referral_code: string;
  referred_by: string | null;
  registration_date: string;
  access_token: string;
};

export type AffiliateUserStats = {
  status: boolean;
  total_users: number;
  total_earnings: string | number;
  total_withdrawals: string | number;
  referral_code: string;
};
