import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const handleRedirectUnAuthenticatedUser = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    return redirect("/onboard");
  }
};
