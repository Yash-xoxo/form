# Form App (GitHub Pages + Render + Supabase)

Simple full-stack form project:
- Frontend: static `index.html` (hosted on GitHub Pages)
- Backend: `Node.js + Express` API (hosted on Render)
- Database: Supabase table (`users`)

## Project Structure

```text
.
├── index.html
├── README.md
└── backend
    ├── package.json
    └── server.js
```

## How It Works

1. User submits name/email from `index.html`.
2. Frontend sends `POST /submit` to your Render API.
3. Render backend inserts row into Supabase `users` table.

Current frontend API URL is hardcoded in `index.html`:
- `https://form-mp7o.onrender.com/submit`

## Supabase Setup

Create a table named `users` with at least:
- `name` (text)
- `email` (text or varchar)

Optional but recommended:
- `id` (uuid, default `gen_random_uuid()`, primary key)
- `created_at` (timestamp with timezone, default `now()`)

## Backend Environment Variables (Render)

Set these in Render service settings:

- `SUPABASE_URL` = your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` = your Supabase service role key
- `PORT` is provided by Render automatically

Note:
- `SUPABASE_SERVICE_ROLE_KEY` is recommended for server-side inserts.
- If you use `SUPABASE_ANON_KEY`, inserts can fail when RLS is enabled.

## Run Locally

From project root:

```bash
cd backend
npm install
SUPABASE_URL=your_url SUPABASE_SERVICE_ROLE_KEY=your_service_role_key npm start
```

Server starts on:
- `http://localhost:3000` (unless `PORT` is set)

## API

### `POST /submit`

Request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

Success response:

```json
{
  "message": "stored"
}
```

Possible errors:
- `400` when `name` or `email` is missing
- `500` when Supabase insert fails

## Deploy

### Frontend (GitHub Pages)

1. Push `index.html` to your GitHub repository.
2. Enable GitHub Pages in repository settings.
3. Open the published Pages URL.

### Backend (Render)

1. Create a new Web Service from this repo (or backend folder).
2. Build command: `npm install`
3. Start command: `npm start`
4. Add required env vars from above.
5. Deploy and confirm logs show server started.

## Troubleshooting

If frontend says success but data is not in Supabase:

1. Open browser DevTools Network tab and inspect `POST /submit`.
2. Check Render logs for `Supabase insert error`.
3. Verify Render env vars are set correctly.
4. Verify table name is exactly `users`.
5. If RLS is enabled, either:
   - use `SUPABASE_SERVICE_ROLE_KEY` in backend, or
   - create proper insert policy for anon/authenticated roles.

## Security Notes

- Never expose `SUPABASE_SERVICE_ROLE_KEY` in frontend code.
- Keep service role key only in backend environment variables.
