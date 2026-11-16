"use client";

import { useEffect, useState } from "react";
import { type User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";

export function useAuth() {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let active = true;

    const {
      data: listener,
    } =
      supabase.auth.onAuthStateChange(
        (_, session) => {
          if (!active) return;

          setUser(
            session?.user ?? null
          );
          setLoading(false);
        }
      );

    async function getUser() {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (
          error &&
          error.name !== "AuthSessionMissingError"
        ) {
          throw error;
        }
        if (active) setUser(user);
      } catch (error) {
        console.error("AUTH SESSION ERROR:", error);
        if (active) setUser(null);
      } finally {
        if (active) setLoading(false);
      }
    }

    void getUser();

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  return {
    user,
    loading,
  };
}
