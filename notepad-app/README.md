# Notepad App (Supabase To-Do)

A modern to-do application built with Next.js, React, and Supabase. This app allows users to create, view, update, and delete to-do tasks, with all data securely stored and synced via Supabase. Authentication is handled using Supabase Auth, and all user and task data is managed in a PostgreSQL database.

## Features

- User authentication (sign up, login) via Supabase Auth
- CRUD operations for to-do tasks (create, read, update, delete)
- Each user's tasks are private and synced with Supabase
- Responsive, modern UI using custom React components
- Error handling for all Supabase operations
- User data is stored in a `users_test` table after signup

## Project Structure

```
ai/docs/                # Project documentation and feature specs
notepad-app/
  src/
    app/                # Next.js app entry and layout
    components/         # React components (auth-form, todo-list, UI)
    lib/                # Supabase client and utilities
  public/               # Static assets
  README.md             # Project documentation (this file)
```

## Dependencies

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Supabase JS](https://supabase.com/docs/reference/javascript)
- [Lucide React](https://lucide.dev/)

## Environment Variables

Create a `.env.local` file in the `notepad-app/` directory with the following:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Setup & Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Configure environment variables:**
   - Copy your Supabase project URL and anon key into `.env.local` as shown above.
3. **Run the development server:**
   ```bash
   npm run dev
   ```
4. **Open the app:**
   - Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Supabase Database Setup

### 1. Create Tables

In the Supabase dashboard, go to the SQL Editor and run the following SQL to create the required tables:

```sql
-- Table for todos
CREATE TABLE IF NOT EXISTS todos (
  id serial PRIMARY KEY,
  text text NOT NULL,
  completed boolean NOT NULL DEFAULT false,
  user_id uuid NOT NULL
);

-- Table for user info
CREATE TABLE IF NOT EXISTS users_test (
  id uuid PRIMARY KEY,
  name text,
  email text
);
```

### 2. Enable Row Level Security (RLS)

For privacy, enable RLS on both tables and add policies as needed:

```sql
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;
ALTER TABLE users_test ENABLE ROW LEVEL SECURITY;

-- Example policy for todos (only allow users to access their own todos)
CREATE POLICY "Allow individual user access" ON todos
  FOR ALL USING (user_id = auth.uid());
```

### 3. Create Trigger to Sync Auth Users to `users_test`

To automatically insert new users into `users_test` after signup, add the following function and trigger:

```sql
-- Function to insert new users into users_test
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users_test (id, name, email)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### 4. Grant Permissions

Make sure your service role or anon key has the correct permissions to insert and select from these tables.

### 5. Reference

- See the [Supabase SQL docs](https://supabase.com/docs/guides/database) for more details on schema, RLS, and triggers.

## Documentation

- See the `ai/docs/` directory for feature specifications, architecture, and development roadmap.

## Contributing

- Follow the coding and workflow standards in `.github/instructions/test-rules.instructions.md`.
- Use atomic commits and conventional commit messages.
- Update documentation in `ai/docs/` for any feature changes.

## License

MIT
