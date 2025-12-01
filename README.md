# Invoice Hub Pro

Simple invoice management service built with Supabase, React, and Vite.

## Tech Stack
- **Frontend**: React + Vite + TypeScript
- **Backend**: Supabase Edge Functions (Deno)
- **Database**: PostgreSQL (Supabase)
- **Deployment**: Supabase Cloud + Vercel

## Local Development

### Prerequisites
- Node.js 20+
- Docker Desktop
- Supabase CLI

### Setup
```bash
# Install dependencies
npm install

# Start Supabase
supabase start

# Start development servers
npm run dev
```

Access:
- Frontend: http://localhost:8080
- API: http://localhost:54321/functions/v1
- Supabase Studio: http://localhost:54323

### Run Tests
```bash
npm test
```

## API Documentation

Open `docs/openapi.yaml` in Swagger Editor: https://editor.swagger.io

## Deployment

See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy (Supabase + Vercel)

1. Deploy database & functions:
```bash
supabase login
supabase link --project-ref your-ref
supabase db push
supabase functions deploy
```

2. Deploy frontend to Vercel:
   - Push to GitHub
   - Import to Vercel
   - Set environment variables
   - Deploy

## Environment Variables

### Frontend
```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### Backend (Supabase Secrets)
```bash
supabase secrets set KEY=value
```

## Project Structure
```
invoice-hub-pro/
├─ frontend/          # React app
├─ supabase/
│  ├─ functions/     # Edge Functions
│  └─ migrations/    # Database migrations
├─ docs/             # API documentation
├─ tests/            # Integration tests
└─ scripts/          # Utility scripts
```

## AI Usage
This project utilizes AI tools for the following purposes:

1. **Project template generation** – created with *Lovable*
2. **Development script templates** – generated using *Claude*
3. **Test suite templates** – generated using *Claude*
4. **Documentation generation** – assisted by *Claude*

## License
MIT