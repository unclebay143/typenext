/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export const useCurrentUser = () => {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: authUser } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", authUser.user?.id)
        .single();

      if (error) {
        setError(error);
      } else {
        setUser(data);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  return { user, error, loading };
};
