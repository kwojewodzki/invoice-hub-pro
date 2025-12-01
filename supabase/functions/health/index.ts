import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  console.log("Health check called!");
  console.log("Method:", req.method);
  console.log("URL:", req.url);

  if (req.method === "OPTIONS") {
    console.log("✅ Handling CORS");
    return new Response(null, { headers: corsHeaders });
  }

  console.log("✅ Returning health status");
  return new Response(
    JSON.stringify({
      status: "ok",
      timestamp: new Date().toISOString(),
    }),
    {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    }
  );
});
