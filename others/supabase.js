const SUPABASE_URL = "https://meozfunxuveohbgkwbvb.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1lb3pmdW54dXZlb2hiZ2t3YnZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2NjQyMjMsImV4cCI6MjA5NjI0MDIyM30.HW3sQQOyHbnM6gpJqR02P6n7r1i9rBaRpamLByfLk-o";

async function supabaseFetch(path, options = {}) {
  const url = `${SUPABASE_URL}/rest/v1/${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: options.prefer || "",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(JSON.stringify(err));
  }

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}
