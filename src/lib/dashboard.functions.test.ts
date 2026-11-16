import { afterEach, describe, expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({ columns: "", error: null as null | { message: string } }));
const client = vi.hoisted(() => vi.fn());
vi.mock("@tanstack/react-start", () => ({
  createServerFn: () => ({ handler: (handler: unknown) => handler }),
}));
vi.mock("@tanstack/react-start/server", () => ({ setResponseHeader: vi.fn() }));
vi.mock("@supabase/supabase-js", () => ({ createClient: client }));

import { getDashboardFeedback } from "./dashboard.functions";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
  state.error = null;
});

function configure() {
  vi.stubEnv("SUPABASE_URL", "https://feedback.example.test");
  vi.stubEnv("SUPABASE_PUBLISHABLE_KEY", "sb_publishable_test");
  vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "");
  client.mockImplementation(() => ({
    from: () => ({
      select: (columns: string) => {
        state.columns = columns;
        return { order: () => ({ limit: async () => ({ data: [], error: state.error }) }) };
      },
    }),
  }));
}

describe("Open dashboard data", () => {
  it("loads without a service key and selects only the seven dashboard fields", async () => {
    configure();
    await expect(getDashboardFeedback()).resolves.toEqual([]);
    expect(state.columns).toBe("id, rating, category, review_text, sentiment, is_demo, created_at");
    expect(client).toHaveBeenCalledWith("https://feedback.example.test", "sb_publishable_test", expect.objectContaining({
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    }));
  });

  it("sends an opaque publishable key as apikey rather than a bearer JWT", async () => {
    configure();
    const fetchMock = vi.fn().mockResolvedValue(new Response());
    vi.stubGlobal("fetch", fetchMock);
    await getDashboardFeedback();
    const shim = client.mock.calls[0]?.[2].global.fetch;
    await shim(new Request("https://feedback.example.test/rest/v1/feedback", {
      headers: { "X-Request-Test": "preserved" },
    }), { headers: { Authorization: "Bearer sb_publishable_test" } });
    const headers = fetchMock.mock.calls[0]?.[1].headers as Headers;
    expect(headers.get("apikey")).toBe("sb_publishable_test");
    expect(headers.has("Authorization")).toBe(false);
    expect(headers.get("X-Request-Test")).toBe("preserved");
  });

  it("reports a failed read instead of silently returning an empty dashboard", async () => {
    configure();
    state.error = { message: "permission denied" };
    await expect(getDashboardFeedback()).rejects.toThrow("Couldn't load feedback.");
  });

  it("fetches dashboard data using only VITE public settings on an exported deployment", async () => {
    configure();
    vi.stubEnv("SUPABASE_URL", "");
    vi.stubEnv("SUPABASE_PUBLISHABLE_KEY", "");
    vi.stubEnv("VITE_SUPABASE_URL", "https://export.example.test");
    vi.stubEnv("VITE_SUPABASE_PUBLISHABLE_KEY", "sb_publishable_export_test");
    await expect(getDashboardFeedback()).resolves.toEqual([]);
    expect(client).toHaveBeenCalledWith("https://export.example.test", "sb_publishable_export_test", expect.any(Object));
  });
});
