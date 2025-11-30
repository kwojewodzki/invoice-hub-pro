#!/bin/bash
set -e

echo "Starting local Supabase database..."
npx supabase start

echo "Running Edge Functions (Deno) in background..."
npx supabase functions serve &
SUPABASE_PID=$!
echo "Running frontend (Vite)..."
cd frontend
npm run dev

kill $SUPABASE_PID