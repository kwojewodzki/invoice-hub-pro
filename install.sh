#!/bin/bash
set -e

echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo "Installing Deno and Supabase CLI if missing..."
if ! command -v deno &> /dev/null
then
    echo "Deno not found. Installing Deno..."
    curl -fsSL https://deno.land/install.sh | sh
fi

if ! command -v supabase &> /dev/null
then
    echo "Supabase CLI not found. Installing..."
    npm install -g supabase
fi

echo "All dependencies installed!"
