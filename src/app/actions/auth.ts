"use server";

import { createClient } from "@/utils/supabase/server";

export default async function googleLogin() {
  const client = await createClient();
  const { data, error } = await client.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });
  if (error) {
    console.log(error);
  }
  return data;
}
