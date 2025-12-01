import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const url = new URL(req.url);
    const pathSegments = url.pathname.split("/").filter(Boolean);
    const invoiceId = pathSegments[pathSegments.length - 1];

    console.log(`${req.method} request to invoices function, ID: ${invoiceId}`);

    // GET all invoices or single invoice
    if (req.method === "GET") {
      if (invoiceId && invoiceId !== "invoices") {
        const { data, error } = await supabase
          .from("invoices")
          .select("*")
          .eq("id", invoiceId)
          .single();

        if (error) {
          console.error("Error fetching invoice:", error);
          return new Response(JSON.stringify({ error: error.message }), {
            status: 404,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        return new Response(JSON.stringify(data), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } else {
        const { data, error } = await supabase
          .from("invoices")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching invoices:", error);
          return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        return new Response(JSON.stringify(data), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // POST - Create new invoice
    if (req.method === "POST") {
      const body = await req.json();

      const { data, error } = await supabase
        .from("invoices")
        .insert([body])
        .select()
        .single();

      if (error) {
        console.error("Error creating invoice:", error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      console.log("Invoice created successfully:", data.id);
      return new Response(JSON.stringify(data), {
        status: 201,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // PUT/PATCH - Update invoice
    if (req.method === "PUT" || req.method === "PATCH") {
      console.log("Updating invoice ID:", invoiceId);
      if (!invoiceId || invoiceId === "invoices") {
        return new Response(
          JSON.stringify({ error: "Invoice ID required for update" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const body = await req.json();

      const { data, error } = await supabase
        .from("invoices")
        .update(body)
        .eq("id", invoiceId)
        .select()
        .single();

      if (error) {
        console.error("Error updating invoice:", error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      console.log("Invoice updated successfully:", invoiceId);
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // DELETE - Delete invoice
    if (req.method === "DELETE") {
      if (!invoiceId || invoiceId === "invoices") {
        return new Response(
          JSON.stringify({ error: "Invoice ID required for deletion" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const { error } = await supabase
        .from("invoices")
        .delete()
        .eq("id", invoiceId);

      if (error) {
        console.error("Error deleting invoice:", error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      console.log("Invoice deleted successfully:", invoiceId);
      return new Response(
        JSON.stringify({ message: "Invoice deleted successfully" }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
