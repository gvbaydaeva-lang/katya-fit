import { createAdminClient } from "@/lib/supabase/admin";
import { getServiceRoleKey } from "@/lib/supabase/env";
import type { DbPayment } from "@/lib/supabase/database.types";

export type AdminPaymentRow = {
  id: string;
  userName: string;
  email: string;
  phone: string | null;
  amount: number;
  planName: string;
  createdAt: string;
};

export function formatPaymentAmount(amountCents: number): string {
  return `$${(amountCents / 100).toFixed(2)}`;
}

export async function fetchAdminPayments(): Promise<{
  rows: AdminPaymentRow[];
  error: string | null;
}> {
  if (!getServiceRoleKey()) {
    return {
      rows: [],
      error:
        "SUPABASE_SERVICE_ROLE_KEY не задан — админка не может читать payments",
    };
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("payments")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return { rows: [], error: error.message };
  }

  const payments = (data ?? []) as DbPayment[];

  return {
    rows: payments.map((payment) => ({
      id: payment.id,
      userName: payment.user_name,
      email: payment.email,
      phone: payment.phone,
      amount: payment.amount,
      planName: payment.plan_name,
      createdAt: payment.created_at,
    })),
    error: null,
  };
}
