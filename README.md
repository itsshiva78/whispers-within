## Whispers Within

Whispers Within is an anonymous messaging web app built with **Next.js 14 (App Router)**, **TypeScript**, and **MongoDB**.  
Users can sign up, share a public profile link, and receive anonymous messages that are viewable in a private dashboard.

### Features

- **Anonymous messaging**
  - Public profile at `/u/[username]` that anyone can use to send you a message.
  - Messages are stored on your account and shown only on your dashboard.
- **Authentication**
  - Email + password sign up and sign in via **NextAuth** credentials provider.
  - Email verification flow using **Resend**.
- **Dashboard**
  - Toggle whether you are currently accepting messages.
  - View messages in reverse chronological order.
  - Manually refresh messages.
- **Modern UI**
  - Built with Tailwind CSS and shadcn/ui components.

---

### Live Demo

Deployed on Vercel:

- App: `https://whispers-within-ldjospyzo-itsshiva78s-projects.vercel.app/`

#### Demo Login (for testing)

Because Resend’s free tier is limited, a demo account is provided for quick testing:

- **Username**: `its_shiva_78`
- **Password**: `123456`

> **Note:** This is a **public demo account** intended only for testing.  
> Do not store any sensitive information under this user.  
> For production, create your own account and change the password.

---

### Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Auth**: NextAuth (Credentials provider)
- **Email**: Resend (verification emails)
- **UI**: React, Tailwind CSS, shadcn/ui

---

### Project Structure (high level)

- `src/app/(app)` – main marketing pages and dashboard
  - `page.tsx` – landing page
  - `dashboard/page.tsx` – authenticated user dashboard
  - `about`, `contact`, `privacy`, `terms` – static informational pages
- `src/app/(auth)` – authentication pages
  - `sign-up/page.tsx` – sign up form with live username availability check
  - `sign-in/page.tsx` – sign in
  - `verify/[username]/page.tsx` – email verification page
- `src/app/u/[username]/page.tsx` – public profile page for sending anonymous messages
- `src/app/api` – API route handlers
  - `sign-up` – create user + send verification email
  - `verify-code` – verify user via code
  - `auth/[...nextauth]` – NextAuth configuration
  - `accept-messages` – toggle whether user accepts messages
  - `get-messages` – fetch messages for signed-in user
  - `send-message` – send anonymous message to a user
  - `check-username-unique` – check if a username is available
- `src/model/User.ts` – Mongoose `User` & `Message` schemas
- `src/lib/dbConnect.ts` – MongoDB connection helper
- `src/helpers/sendVerificationEmail.ts` – Resend email helper

---

### Environment Variables

Create a `.env.local` file in the project root with values similar to:

```bash
MONGODB_URI="your-mongodb-connection-string"

NEXTAUTH_SECRET="a-long-random-secret"
NEXTAUTH_URL="http://localhost:3000"

RESEND_API_KEY="your-resend-api-key"
```

#### Notes

- `MONGODB_URI` should point to your MongoDB instance (e.g. Atlas).
- `NEXTAUTH_SECRET` can be generated with `openssl rand -base64 32` or an online generator.
- `NEXTAUTH_URL` should match your local or production URL:
  - Local dev: `http://localhost:3000`
  - Production (Vercel): your deployed URL.
- `RESEND_API_KEY` comes from the Resend dashboard.

---

### Resend Setup (Verification Emails)

To send verification emails to **any** email address (not just your own), you need to:

1. Sign up / log in at Resend.
2. Add a **custom domain** in the Resend dashboard (e.g. `yourdomain.com`) and complete the DNS configuration.
3. Update the `from` field in `src/helpers/sendVerificationEmail.ts` to use that domain, for example:

```ts
await resend.emails.send({
  from: 'no-reply@yourdomain.com', // your verified domain
  to: email,
  subject: 'Whispers Within Verification Code',
  react: VerificationEmail({ username, otp: verifyCode }),
});
```

On the free tier without a verified domain, Resend may limit which recipients can receive emails.  
For local testing, you can use your own verified email, and for production you should use a verified domain as above.

---

### Running the App Locally

1. **Install dependencies**

```bash
npm install
```

2. **Set environment variables**

Create `.env.local` as described in the **Environment Variables** section.

3. **Run the development server**

```bash
npm run dev
```

Then open `http://localhost:3000` in your browser.

---

### Building and Running in Production Mode

```bash
npm run build
npm start
```

This runs the Next.js app in production mode using the compiled build.

---

### Deployment (Vercel)

The project is optimized for deployment on Vercel:

1. Push your code to GitHub.
2. Create a new Vercel project from the repo.
3. Set the same environment variables in the Vercel dashboard (Project → Settings → Environment Variables).
4. Use the default build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: (leave as default for Next.js)
5. Deploy.

Some API routes (e.g. `get-messages`, `accept-messages`, `check-username-unique`) are explicitly marked as **dynamic** and use the **Node.js runtime** to avoid static prerender issues and always connect to the database at request time.

---

### Authentication & Verification Flow (High Level)

1. **Sign up**
   - User submits username, email, and password to `/api/sign-up`.
   - Server checks username and email uniqueness.
   - Server creates/updates the user with a hashed password and a 6-digit verification code.
   - `sendVerificationEmail` sends the code via Resend.
2. **Verify**
   - User visits `/verify/[username]` and enters the verification code.
   - If the code matches and is not expired, the user is marked `isVerified = true`.
3. **Sign in**
   - User signs in with email + password via NextAuth.
4. **Dashboard**
   - After sign in, the user can:
     - Copy their public profile link.
     - Toggle whether they accept messages (`/api/accept-messages`).
     - View received messages (`/api/get-messages`).

---

### Anonymous Messaging Flow

1. Visitor opens a user’s public link at `/u/[username]`.
2. They submit an anonymous message via the form.
3. The message is stored under that user’s document in MongoDB via `/api/send-message`.
4. The message appears in the recipient’s dashboard (after fetching from `/api/get-messages`).

---

### Notes & Limitations

- This project is intended as a **learning/demo** app.
- The demo account (`its_shiva_78` / `123456`) is public and should not be used for sensitive data.
- Email delivery depends on correct Resend configuration and domain verification.

---

### License

This project is currently unlicensed.  
If you plan to reuse or modify it for public use, please add a license file suitable for your needs.

## Whispers Within

Whispers Within is a full‑stack anonymous messaging web app built with **Next.js 14 (App Router)**, **NextAuth**, **MongoDB (Mongoose)**, and **Resend** for email verification.

Users can:
- **Sign up** with email, username, and password.
- **Verify** their email via a 6‑digit verification code.
- **Share a public profile link** so others can send them anonymous messages.
- **Sign in** and manage:
  - Whether they **accept new messages**.
  - **View and delete** received messages in a dashboard.

The app is deployed on **Vercel** and uses **serverless API routes** for all backend operations.

---

## Tech Stack

- **Framework**: Next.js 14 (App Router, TypeScript)
- **Auth**: NextAuth.js
- **Database**: MongoDB with Mongoose
- **Email**: Resend (React Email templates)
- **UI**:
  - Tailwind CSS
  - Shadcn‑style UI components (buttons, inputs, forms, toast, etc.)
- **Other**:
  - Axios (client‑side HTTP)
  - Zod (validation)
  - React Hook Form

---

## Project Structure (high level)

- `src/app`
  - `(app)` – public pages (`/`, `/about`, `/contact`, `/dashboard`, `/u/[username]`, etc.)
  - `(auth)` – auth flows (`/sign-in`, `/sign-up`, `/verify/[username]`)
  - `api` – serverless API routes:
    - `accept-messages` – get/update whether a user accepts new messages.
    - `auth/[...nextauth]` – NextAuth configuration and route.
    - `check-username-unique` – checks if a username is available.
    - `delete-message/[messageid]` – delete a specific message.
    - `get-messages` – fetches messages for the logged‑in user.
    - `send-message` – send an anonymous message to a user.
    - `sign-up` – registration endpoint, sends verification email.
    - `suggest-messages` – AI‑based message suggestions (Gemini/OpenAI).
    - `verify-code` – verify the 6‑digit email code.
- `src/components` – shared UI components (`Navbar`, `Footer`, `MessageCard`, `ui/*`).
- `src/context/AuthProvider.tsx` – NextAuth session provider.
- `src/helpers/sendVerificationEmail.ts` – Resend email sending helper.
- `src/lib`
  - `dbConnect.ts` – MongoDB connection helper (Mongoose).
  - `resend.ts` – Resend client instance.
  - `utils.ts` – shared utilities.
- `src/model/User.ts` – Mongoose `User` and `Message` schemas.
- `emails` – React Email templates (`VerificationEmail`, `NewMessageEmail`).
- `scripts` – small Node scripts for debugging APIs and external models.

---

## Environment Variables

Create a `.env.local` file in the project root with at least:

```bash
MONGODB_URI=your-mongodb-connection-string
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret

RESEND_API_KEY=your_resend_api_key

GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key          # if using Gemini/ai features
OPENAI_API_KEY=your_openai_api_key                        # if using OpenAI/ai features
```

On **Vercel**, add the same variables in:
- Project → **Settings → Environment Variables** for the relevant environments (Preview/Production).

---

## Resend and Email Verification

The sign‑up flow always generates a **6‑digit verification code** and calls `sendVerificationEmail`:
- Implementation: `src/helpers/sendVerificationEmail.ts`
- Uses a **React Email** template: `emails/VerificationEmail.tsx`

Important notes for Resend:
- With the **free/sandbox** project:
  - Emails are only reliably delivered to **verified recipients** or via a **verified sending domain**.
- For production (sending to everyone):
  1. In the Resend dashboard, go to **Domains → Add Domain** and add a domain you own (e.g. `yourdomain.com`).
  2. Add the DNS records Resend shows (TXT/CNAME/MX) at your DNS provider.
  3. Wait until the domain status is **Verified**.
  4. Update `sendVerificationEmail` to use that domain:

```ts
await resend.emails.send({
  from: 'no-reply@yourdomain.com', // must match your verified domain
  to: email,
  subject: 'Whispers Within Verification Code',
  react: VerificationEmail({ username, otp: verifyCode }),
});
```

Until you verify a domain or specific recipients, Resend may drop emails to arbitrary addresses on the free tier.

---

## MongoDB / Mongoose

The app uses a single `User` collection:
- Fields include `username`, `email`, `password`, `verifyCode`, `verifyCodeExpiry`, `isVerified`, `isAcceptingMessages`, and `messages[]`.
- Messages are embedded documents with `content` and `createdAt`.
- `src/lib/dbConnect.ts` manages a shared Mongoose connection for all API routes.

For local development, you can use:
- **MongoDB Atlas** (recommended): copy the connection string into `MONGODB_URI`.
- Or a local MongoDB instance if you prefer.

---

## Auth Flow (Sign Up / Verify / Sign In)

### Sign Up
1. User visits `/sign-up`.
2. Username field debounces and calls `/api/check-username-unique` to show:
   - **“Username is unique”** or
   - **“Username is already taken”** (if a verified user with that username exists).
3. On submit:
   - `/api/sign-up` checks uniqueness of username and email.
   - Hashes the password with **bcryptjs**.
   - Generates a `verifyCode` and expiry (~1 hour).
   - Creates or updates the `User` document.
   - Sends a verification email via **Resend** with the 6‑digit code.

### Verify
1. User is redirected to `/verify/[username]`.
2. They enter the OTP they received by email.
3. `/api/verify-code`:
   - Validates the username and code.
   - Checks `verifyCodeExpiry`.
   - Marks `isVerified = true` if valid.

### Sign In
1. User visits `/sign-in`.
2. NextAuth credentials provider checks:
   - Email/password (with bcrypt compare).
   - `isVerified` must be true.
3. On success, user is redirected to `/dashboard`.

---

## Messaging Flow

### Public Profile

- Public route: `/u/[username]`
- Anyone can:
  - See the user’s public page.
  - Send an **anonymous message** via a form.
  - Optionally use **AI suggestions** (`/api/suggest-messages`) to generate message ideas.

### Sending a Message

1. The public form POSTs to `/api/send-message`.
2. The API:
   - Finds the `User` by username.
   - Checks `isAcceptingMessages`.
   - Appends a new `messages[]` entry (with content + timestamp).
   - Optionally notifies the user via email (template: `emails/NewMessageEmail.tsx`).

### Dashboard (Private)

- Route: `/dashboard` (client component).
- Uses `useSession` from NextAuth to get the current user.
- On mount:
  - Calls `/api/get-messages` to fetch the user’s messages.
  - Calls `/api/accept-messages` to get the `isAcceptingMessages` flag.
- Provides:
  - A toggle to enable/disable accepting new messages (POST `/api/accept-messages`).
  - A list of `MessageCard`s with delete actions (DELETE `/api/delete-message/[messageid]`).
  - A copyable profile link (`/u/[username]`).

---

## Local Development

1. **Install dependencies**

```bash
npm install
```

2. **Create `.env.local`**

Fill in the environment variables listed above (`MONGODB_URI`, `NEXTAUTH_*`, `RESEND_API_KEY`, etc.).

3. **Run the dev server**

```bash
npm run dev
```

Then open `http://localhost:3000` in your browser.

---

## Production Deployment (Vercel)

This project is optimized for **Vercel**:

- Build command: `npm run build`
- Output: Next.js app (no `next export`)
- API routes are serverless functions:
  - Some are explicitly marked as **dynamic** and **Node.js runtime** (e.g. `get-messages`, `accept-messages`, `check-username-unique`) to avoid prerender DB issues.

Steps:
1. Push your code to GitHub.
2. Import the repo in Vercel.
3. Set all required environment variables in Vercel.
4. Deploy.

If you see build errors about “prerendering” or “Dynamic server usage” on API routes, ensure:
- They are marked with:

```ts
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
```

and that Vercel is **not** using `next export`.

---

## Useful Scripts

Defined in `package.json`:

- `npm run dev` – start the Next.js dev server.
- `npm run build` – production build.
- `npm run start` – start the production server locally.
- `npm run lint` – run ESLint.

Additional Node helper scripts live in the `scripts/` directory, such as:
- `test-db.mjs` – test database connectivity.
- `test-openai.mjs`, `test-gemini.mjs`, etc. – test AI provider integration.

---

## Future Improvements

- Rate limiting for message sending to prevent abuse.
- Better moderation / reporting tools for received messages.
- Improved analytics for users (message stats, charts, etc.).
- More polished email templates and branding once a custom domain is configured.

