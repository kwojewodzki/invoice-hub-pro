#!/bin/bash
set -e

echo "Running backend tests (Deno)..."
npx deno test --allow-all supabase/functions/tests/health-test.ts --no-check
npx deno test --allow-all supabase/functions/tests/invoices-test.ts --no-check


echo "Backend tests completed!"