# Notepad App Architecture

## Overview
This document outlines the architecture for a Notepad app with user logins, leveraging Next.js for the front-end UI and Supabase for storage.

---

## 1. Front-End (Next.js)
- **Framework**: Next.js is used for the front-end, providing server-side rendering (SSR) and static site generation (SSG) for fast and SEO-friendly pages.
- **UI Components**: Built with React, including:
  - Login/Signup forms.
  - A dashboard for managing notes.
  - A rich text editor for creating and editing notes.
- **Routing**: File-based routing in Next.js handles navigation:
  - `/login` for user authentication.
  - `/dashboard` for the user's notes.
  - `/note/[id]` for viewing/editing a specific note.
- **State Management**: Local state (e.g., React Context or Zustand) manages UI state, while Supabase handles persistent data.

---

## 2. Authentication (Supabase)
- **User Management**: Supabase's built-in authentication manages user signups, logins, and password resets, supporting multiple providers (email/password, OAuth, etc.).
- **Session Management**: Supabase provides session tokens, stored in cookies or local storage. Middleware in Next.js validates these tokens for protected routes.

---

## 3. Backend (Supabase)
- **Database**: Supabase uses PostgreSQL with tables such as:
  - `users`: Managed by Supabase for authentication.
  - `notes`: Stores user-created notes with fields like `id`, `user_id`, `title`, `content`, `created_at`, and `updated_at`.
- **APIs**: Supabase auto-generates RESTful APIs for database operations, secured with Row-Level Security (RLS) policies to ensure users can only access their own data.
- **Real-Time Updates**: Supabase's real-time capabilities push updates to the front end when notes are created, updated, or deleted.

---

## 4. Middleware (Next.js API Routes)
- **Custom Logic**: Next.js API routes act as middleware for:
  - Validating Supabase tokens.
  - Adding custom business logic (e.g., rate limiting, additional validation).
- **Server-Side Rendering (SSR)**: Protected pages like the dashboard fetch user-specific data server-side using Supabase APIs.

---

## 5. Storage (Supabase)
- **File Storage**: Supabase's storage handles file uploads (e.g., attachments for notes). Access is restricted to authenticated users.
- **Data Storage**: Notes and metadata are stored in the PostgreSQL database.

---

## 6. Security
- **Authentication**: Supabase handles secure authentication and token management.
- **Authorization**: Row-Level Security (RLS) policies in Supabase ensure users can only access their own data.
- **Environment Variables**: Sensitive keys (e.g., Supabase API keys) are stored securely in `.env` files.

---

## 7. Deployment
- **Front-End**: The Next.js app is deployed on platforms like Vercel for optimized performance and scalability.
- **Supabase**: Supabase is a managed service, requiring no additional deployment for the backend.

---

## 8. Workflow
1. **User Login**: Users log in via the Next.js front end, which communicates with Supabase for authentication.
2. **Dashboard**: After login, the user is redirected to the dashboard, where their notes are fetched from Supabase.
3. **Note Management**: Users can create, edit, or delete notes. These actions trigger API calls to Supabase, which updates the database and pushes real-time changes to the front end.

---

This architecture adheres to principles of simplicity, scalability, and security, leveraging the strengths of both Next.js and Supabase.
