"server only";

import { clerkClient } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import config from "@/config";

export const isAuthorized = async (
  userId: string
): Promise<{ authorized: boolean; message: string }> => {
  if (!config?.payments?.enabled) {
    return {
      authorized: true,
      message: "Payments are disabled",
    };
  }

  try {
    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);

    if (!user) {
      return {
        authorized: false,
        message: "User not found",
      };
    }

    const cookieStore = cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    const { data: subscription, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // No rows returned
        return {
          authorized: false,
          message: "No active subscription found",
        };
      }
      throw error;
    }

    if (subscription?.status === "active") {
      return {
        authorized: true,
        message: "User has an active subscription",
      };
    }

    return {
      authorized: false,
      message: "Subscription is not active",
    };
  } catch (error) {
    console.error('Authorization check failed:', error);
    return {
      authorized: false,
      message: "Failed to verify authorization",
    };
  }
};
