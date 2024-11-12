"use client";

import { createClient } from "@/utils/supabase/client";
import { Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

type GoogleSessionContextType = {
  session: Session | null;
};

const GoogleSessionContext = createContext<
  GoogleSessionContextType | undefined
>(undefined);

export function useGoogleSession() {
  const context = useContext(GoogleSessionContext);
  if (!context) {
    throw new Error("No Google Session Context!");
  }
  return context;
}

export function GoogleSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const client = createClient();
    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <GoogleSessionContext.Provider value={{ session }}>
      {children}
    </GoogleSessionContext.Provider>
  );
}
