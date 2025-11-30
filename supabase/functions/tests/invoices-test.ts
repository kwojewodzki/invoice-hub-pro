// supabase/tests/invoices_test.ts

import {
  assertEquals,
  assert,
} from "https://deno.land/std@0.214.0/testing/asserts.ts";

import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";
import 'jsr:@std/dotenv/load'



const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;
const client: SupabaseClient = createClient(supabaseUrl, supabaseKey);

const newInvoice = JSON.stringify({
    invoice_number: "INV-1001",
    client_name: "John Doe",
    amount: 100,
    issue_date: "2025-11-30",
    due_date: "2025-12-30"
});

async function deleteInvoice(id?: any) {
    await client
        .from('invoices')
        .delete()
        .eq('id', id);
    }

// Helpers
async function invokeInvoices(method: string, body?: any, id?: string) {
    let url = "/invoices";
    if (id) {
        url = url.concat('/',id);
    }
    console.log(url);
  return client.functions.invoke(url, {
    method,
    body,
    headers: {
      "Content-Type": "application/json",
    },
    path: id ? `/${id}` : "",
  });
}

/**
 * ----------------------------------------
 *                 TESTS
 * ----------------------------------------
 */

Deno.test("GET /invoices → should return list", async () => {
    const { data, error } = await invokeInvoices("GET");
    assert(!error, "Function returned an error");
    assert(Array.isArray(data), "Returned value should be array");
});

Deno.test("GET /invoices/:id → should return single invoice", async () => {
    const { data: created } = await invokeInvoices("POST", newInvoice);
    const { data, error } = await invokeInvoices("GET", undefined, created.id);
    assert(!error, "Function returned error on GET by ID");
    assertEquals(data.id, created.id);
    await deleteInvoice(data.id);
});

Deno.test("POST /invoices → should create invoice", async () => {

    const { data, error } = await invokeInvoices("POST", newInvoice);
    assert(!error, "Function returned error on POST");
    assertEquals(data.client_name, "John Doe");
    assert(typeof data.id === "string");
    await deleteInvoice( data.id);
});

Deno.test("PUT /invoices/:id → should update invoice", async () => {
    const { data: created } = await invokeInvoices("POST", newInvoice);
    console.log(created.id);
    const { data, error } = await invokeInvoices(
        "PUT",
        JSON.stringify({ amount: 1234 }),
        created.id,
    );
    assert(!error);
    assertEquals(data.amount, 1234);
    await deleteInvoice(data.id);
    });

Deno.test("DELETE /invoices/:id → should delete invoice", async () => {
  const { data: created } = await invokeInvoices("POST", newInvoice);

  const { data, error } = await invokeInvoices("DELETE", undefined, created.id);

  assert(!error);
  assertEquals(data.message, "Invoice deleted successfully");
});
