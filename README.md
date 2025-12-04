# Invoice Hub Pro

Simple invoice management service built with Supabase, React, and Vite.

## Tech Stack

- **Frontend**: React + Vite + TypeScript
- **Backend**: Supabase Edge Functions (Deno)
- **Database**: PostgreSQL (Supabase)
- **Deployment**: Supabase Cloud + Vercel

## Local Development

See [Local_Deployment.md](docs/Local_Deployment.md) for detailed deployment instructions.

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

1. **Project template generation** – created with _Lovable_
2. **Development script templates** – generated using _Claude_
3. **Test suite templates** – generated using _Claude_
4. **Documentation generation** – assisted by _Claude_

## Author
Konrad Wojewódzki
## License
<<<<<<< HEAD

=======
>>>>>>> 5e3e4771ebe14a4974a71a6ba591418e5cf7fe7f
MIT
