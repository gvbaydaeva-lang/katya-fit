export type SubscriptionStatus =
  | "active"
  | "trialing"
  | "past_due"
  | "canceled"
  | "expired";

export type DbProfile = {
  id: string;
  email: string;
  full_name: string | null;
  last_name: string | null;
  first_name: string | null;
  middle_name: string | null;
  birth_date: string | null;
  phone: string | null;
  city: string | null;
  about: string | null;
  created_at: string;
  updated_at: string;
};

export type DbWorkoutContentBlock =
  | { id: string; type: "text"; text: string }
  | { id: string; type: "video"; url: string; video_type: "youtube" | "upload" }
  | { id: string; type: "file"; name: string; url: string; mime: string };

export type DbWorkout = {
  id: string;
  title: string;
  description: string;
  module_name: string;
  position: number;
  is_published: boolean;
  content_blocks: DbWorkoutContentBlock[];
  video_url: string;
  video_type: "youtube" | "upload";
  tariffs: Array<"self" | "coached" | "platform">;
  materials: Array<{
    name: string;
    url: string;
    type: string;
  }>;
  created_at: string;
  updated_at: string;
};

export type DbSubscription = {
  id: string;
  user_id: string;
  plan_id: "self" | "coached" | "platform";
  status: SubscriptionStatus;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  stripe_checkout_session_id: string | null;
  current_period_start: string | null;
  current_period_end: string | null;
  created_at: string;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: DbProfile;
        Insert: Pick<DbProfile, "id" | "email"> & {
          full_name?: string | null;
        };
        Update: Partial<
          Pick<
            DbProfile,
            | "full_name"
            | "email"
            | "last_name"
            | "first_name"
            | "middle_name"
            | "birth_date"
            | "phone"
            | "city"
            | "about"
          >
        >;
      };
      subscriptions: {
        Row: DbSubscription;
        Insert: Pick<
          DbSubscription,
          "user_id" | "plan_id"
        > & Partial<
          Pick<
            DbSubscription,
            | "status"
            | "stripe_customer_id"
            | "stripe_subscription_id"
            | "stripe_checkout_session_id"
            | "current_period_start"
            | "current_period_end"
          >
        >;
        Update: Partial<Omit<DbSubscription, "id" | "user_id">>;
      };
      workouts: {
        Row: DbWorkout;
        Insert: Pick<
          DbWorkout,
          | "title"
          | "description"
          | "module_name"
          | "position"
          | "is_published"
          | "content_blocks"
          | "video_url"
          | "video_type"
          | "tariffs"
          | "materials"
        >;
        Update: Partial<
          Pick<
            DbWorkout,
            | "title"
            | "description"
            | "module_name"
            | "position"
            | "is_published"
            | "content_blocks"
            | "video_url"
            | "video_type"
            | "tariffs"
            | "materials"
          >
        >;
      };
    };
  };
};
