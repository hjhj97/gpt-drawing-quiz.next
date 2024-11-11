"use client";

import googleLogin from "@/app/actions/auth";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useState } from "react";

export default function SocialLogin() {
  const client = createClient();
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = async () => {
    const data = await googleLogin();
    if (data.url) {
      window.location.href = data.url;
    }
  };

  const handleLogout = async () => {
    await client.auth.signOut();
    setUser(null);
  };

  client.auth.onAuthStateChange(async (event, session) => {
    if (event === "SIGNED_IN" && !user) {
      const userResponse = await client.auth.getUser(session?.access_token);
      setUser(userResponse.data.user);
    }
  });

  return (
    <>
      {user ? (
        <button className="" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <button className="" onClick={handleLogin}>
          Google Login
        </button>
      )}
    </>
  );
}
