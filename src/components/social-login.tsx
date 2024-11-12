"use client";

import googleLogin from "@/app/actions/auth";
import { useGoogleSession } from "@/context/google-session-context";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

export default function SocialLogin() {
  const { session, isLoading } = useGoogleSession();

  const handleLogin = async () => {
    const data = await googleLogin();
    if (data.url) {
      window.location.href = data.url;
    }
  };

  const handleLogout = async () => {
    const client = createClient();
    await client.auth.signOut();
  };

  return (
    <>
      {isLoading ? (
        <div className="w-24 h-10 bg-gray-300 rounded-md"></div>
      ) : session ? (
        <button
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 w-24"
          onClick={handleLogout}
        >
          로그아웃
        </button>
      ) : (
        <button onClick={handleLogin}>
          <div className="flex items-center gap-2">
            <Image
              src="./google-social-login.svg"
              alt="Google"
              width={40}
              height={40}
            />
          </div>
        </button>
      )}
    </>
  );
}
