// Import required libraries and modules
import { assert, assertEquals } from "jsr:@std/assert@1";
import { createClient, SupabaseClient } from "npm:@supabase/supabase-js@2";

// Will load the .env file to Deno.env
import "jsr:@std/dotenv/load";

// Set up the configuration for the Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const supabaseKey = Deno.env.get("SUPABASE_PUBLISHABLE_KEY") ?? "";
const options = {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
};

Deno.test("Client Creation Test", async () => {
  var client: SupabaseClient = createClient(supabaseUrl, supabaseKey, options);

  if (!supabaseUrl) throw new Error("supabaseUrl is required.");
  if (!supabaseKey) throw new Error("supabaseKey is required.");

  const { data: table_data, error: table_error } = await client
    .from("invoices")
    .select("*")
    .limit(1);
  if (table_error) {
    throw new Error("Invalid Supabase client: " + table_error.message);
  }
  assert(table_data, "Data should be returned from the query.");
});

Deno.test("Health Function Test", async () => {
  var client: SupabaseClient = createClient(supabaseUrl, supabaseKey, options);

  const { data: func_data, error: func_error } = await client.functions.invoke(
    "health"
  );

  if (func_error) {
    throw new Error("Invalid response: " + func_error.message);
  }

  assertEquals(func_data.status, "ok");
});
