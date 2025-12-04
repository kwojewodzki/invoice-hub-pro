# Local Development Guide

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js 20+** - [Download](https://nodejs.org/)
- **Docker Desktop** - [Download](https://www.docker.com/products/docker-desktop/)
- **Supabase CLI** - Install via npm: `npm install -g supabase`
- **Git** - [Download](https://git-scm.com/)

---

## Initial Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd invoice-hub-pro
```

### 2. Install dependencies

```bash
npm run install
```

This will install all frontend dependencies.

### 3. Initialize Supabase (first time only)

```bash
npx supabase init
```

### 4. Configure environment variables

Create environment files:

```bash
# Windows
copy frontend\.env.example frontend\.env.local
copy .env.example .env

# Mac/Linux
cp frontend/.env.example frontend/.env.local
cp .env.example .env
```

Edit `frontend/.env.local` and add your Supabase credentials:

```bash
VITE_SUPABASE_URL=http://127.0.0.1:54321
VITE_SUPABASE_PUBLISHABLE_KEY=your_pub_key_here
```

Edit `.env`:

```bash
SUPABASE_URL=http://127.0.0.1:54321
SUPABASE_PUBLISHABLE_KEY=your_pub_key_here
SUPABASE_ANON_KEY=your_anon_key_here
```

**To get your publishable key:**

1. Start Supabase: `npm run supabase:start`
2. Copy the `publishable key` from the output (starts with `sb_publishable`)

---

## Running the Application

You have two options for running the development environment:

### Option A: Separate Terminals (Recommended for debugging)

**Terminal 1 - Backend (Database + Functions):**

```bash
npm run dev:backend
```

This starts:

- Supabase database (PostgreSQL)
- Supabase Studio (Database UI)
- Edge Functions API

**Terminal 2 - Frontend:**

```bash
npm run dev:frontend
```

This starts the React development server.

### Option B: Individual Services

If you need more control, run services separately:

**Terminal 1 - Database:**

```bash
npm run dev:supabase
```

**Terminal 2 - Edge Functions:**

```bash
npm run dev:functions
```

**Terminal 3 - Frontend:**

```bash
npm run dev:frontend
```

---

## Access Points

Once all services are running, you can access:

| Service             | URL                                 | Description              |
| ------------------- | ----------------------------------- | ------------------------ |
| **Frontend**        | http://localhost:5173               | React application        |
| **API**             | http://127.0.0.1:54321/functions/v1 | Edge Functions endpoints |
| **Supabase Studio** | http://127.0.0.1:54323              | Database management UI   |

### API Endpoints

- `GET /functions/v1/health` - Health check (no auth required)
- `GET /functions/v1/invoices` - List all invoices (auth required)
- `GET /functions/v1/invoices/{id}` - List invoice (auth required)
- `POST /functions/v1/invoices` - Create new invoice (auth required)
- `DELETE /functions/v1/invoices/{id}` - Delete invoice (auth required)
- `PUT /functions/v1/invoices/{id}` - Update invoice (auth required)
- `PATCH /functions/v1/invoices/{id}` - Update invoice (auth required)

---

## Available Scripts

### Development

| Command                 | Description                                   |
| ----------------------- | --------------------------------------------- |
| `npm run install`       | Install frontend dependencies                 |
| `npm run dev:backend`   | Start backend services (database + functions) |
| `npm run dev:supabase`  | Start Supabase database only                  |
| `npm run dev:functions` | Start Edge Functions only                     |
| `npm run dev:frontend`  | Start React development server                |

### Testing & Quality

| Command        | Description           |
| -------------- | --------------------- |
| `npm run test` | Run integration tests |
| `npm run lint` | Lint frontend code    |

### Supabase Management

| Command                   | Description                 |
| ------------------------- | --------------------------- |
| `npm run supabase:start`  | Start Supabase services     |
| `npm run supabase:stop`   | Stop Supabase services      |
| `npm run supabase:status` | Show status and credentials |

---

### Using the Frontend

1. Start all services: `npm run dev:backend` and `npm run dev:frontend`
2. Open http://localhost:5173
3. Use the UI to create and manage invoices

---

## Database Management

### Access Supabase Studio

```bash
# After starting Supabase, open:
http://127.0.0.1:54323
```

In Supabase Studio you can:

- Browse tables and data
- Run SQL queries
- View logs
- Manage authentication

### Reset Database

**⚠️ Warning: This will delete all data!**

```bash
npx supabase db reset
```

This command:

- Drops all tables
- Re-runs all migrations
- Seeds the database (if seed file exists)

---

## Troubleshooting

### Port already in use

```bash
# Stop all services
npm run supabase:stop

# Check what's using the port (Windows)
netstat -ano | findstr :54321

# Kill the process
taskkill /PID <process_id> /F

# Restart
npm run dev:backend
```

### Docker not running

Make sure Docker Desktop is running before starting Supabase:

1. Open Docker Desktop
2. Wait for it to fully start (icon stops spinning)
3. Run `npm run dev:backend`

### Frontend can't connect to API

1. **Check environment variables:**

   ```bash
   cat frontend/.env.local  # Mac/Linux
   type frontend\.env.local  # Windows
   ```

2. **Verify Supabase is running:**

   ```bash
   npm run supabase:status
   ```

3. **Restart frontend dev server:**
   ```bash
   # In the frontend terminal: Ctrl+C
   npm run dev:frontend
   ```

### Functions not updating

If you make changes to Edge Functions and they're not reflected:

```bash
# Stop functions (Ctrl+C in functions terminal)
# Restart:
npm run dev:functions
```

### Can't see console.log in functions

Logs from Edge Functions appear in the terminal where you ran `npm run dev:functions`, **not** in the browser console.

---

## Daily Workflow

### Starting Work

```bash
# 1. Navigate to project
cd invoice-hub-pro

# 2. Start backend (Terminal 1)
npm run dev:backend

# 3. Start frontend (Terminal 2)
npm run dev:frontend

# 4. Open browser
# http://localhost:5173
```

### During Development

- Frontend changes hot-reload automatically
- Function changes require restart: Ctrl+C → `npm run dev:functions`
- Database changes require migration or reset

### Ending Work

```bash
# Stop dev servers (Ctrl+C in each terminal)

# Stop Supabase
npm run supabase:stop
```

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Deno Documentation](https://deno.land/manual)
