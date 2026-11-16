import { createServerFn } from "@tanstack/react-start";
import { setResponseHeader } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

// The dashboard is open (no password). Only non-personal columns are returned:
// customer names and emails never leave the server.
export const getDashboardFeedback = createServerFn({ method: "GET" }).handler(async () => {
  setResponseHeader("Cache-Control", "no-store");
  // Self-hosting can reuse the browser's public build-time configuration.
  // Runtime values take precedence for Lovable's local preview connection.
  const url = process.env['SUPABASE_URL'] || import.meta.env['VITE_SUPABASE_URL'];
  const key = process.env['SUPABASE_PUBLISHABLE_KEY'] || import.meta.env['VITE_SUPABASE_PUBLISHABLE_KEY'];
  if (!url || !key) throw new Error("Feedback connection is not configured.");
  // This client uses the same column permissions and RLS as public visitors.
  // Never attach a user session or use an admin key for dashboard reads.
  const supabasePublic = createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(input instanceof Request ? input.headers : undefined);
        new Headers(init?.headers).forEach((value, name) => headers.set(name, value));
        if (key.startsWith('sb_') && headers.get('Authorization') === `Bearer ${key}`) {
          headers.delete('Authorization');
        }
        headers.set('apikey', key);
        return fetch(input, { ...init, headers });
      },
    },
  });
  const { data, error } = await supabasePublic.from("feedback")
    .select("id, rating, category, review_text, sentiment, is_demo, created_at")
    .order("created_at", { ascending: false }).limit(1000);
  if (error) throw new Error("Couldn't load feedback.");
  return data ?? [];
});
