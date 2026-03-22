<div align="center">
  <img src="public/logo.png" alt="Whispers Within Logo" width="180" />
  <h1>🤫 Whispers Within</h1>
  <p><strong>The Ultimate Anonymous Messaging & Feedback Platform</strong></p>
  
  <p>
    <img src="https://img.shields.io/badge/Next.js%2014-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
    <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/Cashfree-5E3AEE?style=for-the-badge&logo=cashfree&logoColor=white" alt="Cashfree" />
    <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  </p>
</div>

<br/>

**Whispers Within** is a modern, full-stack anonymous messaging application that lets users receive honest, unfiltered feedback from anyone, anywhere. Featuring a beautifully crafted dark-mode glassmorphic UI, robust serverless architecture, and a highly viral "Identity Reveal" payment gateway powered by Cashfree!

---

## 📸 Screenshots

*(Add your images here! Simply replace `link_to_your_image` with an actual screenshot URL, or drag-and-drop your screenshots directly into GitHub!)*

| Landing Page | User Dashboard |
| :---: | :---: |
| <img src="public/landing.png" alt="Landing Page" width="500"/> | <img src="public/dashboard.png" alt="User Dashboard" width="500"/> |

| Create Identity (Sign Up) | Confession Wall |
| :---: | :---: |
| <img src="public/signup.png" alt="Sign Up Page" width="500"/> | <img src="public/wall.png" alt="Confession Wall" width="500"/> |

---

## ✨ Viral Features

- 🎭 **Anonymous Messaging**: Generate a unique, shareable profile link (`/u/username`) to receive secret messages instantly without the sender needing an account.
- 💳 **Premium Identity Reveal**: Monetize curiosity! Users can securely pay (via **Cashfree Payment Gateway**) to unlock the hidden identity and device metadata of the sender.
- 🤖 **Gemini AI Integration**: Sender has writer's block? Built-in AI auto-generates creative, deep, or funny anonymous messages with one click.
- 🔐 **Bulletproof Authentication**: Offers standard Email/Password sign-up as well as frictionless **Google OAuth** login via **NextAuth v4**.
- ✉️ **OTP Email Verification**: Secure domain email verification using magic 6-digit codes delivered flawlessly via **Resend**.
- 📱 **Mobile-First & Responsive**: A flawless, premium, app-like experience across Mobile, Tablet, and Desktop using Tailwind & Framer Motion.
- 🎛️ **Private Dashboard**: Pause incoming whispers, delete old messages, reveal identities, and easily share your link to Instagram or Snapchat.
- 🧱 **Confession Wall**: A public, auto-scrolling wall highlighting the best messages.

---

## 🚀 Live Demo

**[Experience Whispers Within here!](https://www.whispers-within.in)**

---

## 🛠️ Tech Stack & Architecture

- **Frontend:** Next.js 14 App Router, React 18, Tailwind CSS, Shadcn UI, Embla Carousel.
- **Backend:** Next.js Serverless API Routes, Node.js edge runtime.
- **Database:** MongoDB & Mongoose ORM.
- **Authentication:** NextAuth (Credentials & Google Providers), bcrypt.js.
- **Payments:** Cashfree PG Node.js SDK (`cashfree-pg`) & Client SDK (`@cashfreepayments/cashfree-js`).
- **Emails:** Resend API & React Email Templates.
- **Validation**: Zod & React Hook Form.

---

## 💻 Getting Started Locally

Getting the app running on your local machine is incredibly simple.

### 1. Clone the repository & Install Dependencies
```bash
git clone https://github.com/itsshiva78/whispers-within.git
cd whispers-within
npm install
```

### 2. Set up Environment Variables
Create a `.env` file in the root directory and add all the required keys:

```env
# Application
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_super_secret_generated_string

# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication & Emails
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_secret
RESEND_API_KEY=your_resend_api_key

# Generative AI (Crucial for auto-suggestions)
GEMINI_API_KEY=your_gemini_api_key

# Payments (Cashfree Identity Reveal)
CASHFREE_APP_ID=your_cashfree_app_id
CASHFREE_SECRET_KEY=your_cashfree_secret_key
CASHFREE_ENVIRONMENT=SANDBOX # Toggle to PRODUCTION when live
```

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to experience the magic locally!

---

## 🚢 Production Deployment

This project's serverless architecture is heavily optimized to be deployed instantly on **Vercel**:
1. Push your repository to GitHub.
2. Import the project in Vercel.
3. Add all your environment variables in the Vercel Dashboard (Project Settings -> Environment Variables).
4. *Important*: Ensure `NEXTAUTH_URL` is set to your actual live Vercel domain (e.g., `https://www.whispers-within.in`) and `CASHFREE_ENVIRONMENT` is set to `PRODUCTION`.
5. Click **Deploy**.

---

<div align="center">
  <p>Built with ❤️ by <b>Shiva</b></p>
  <p>If you like this project, please consider leaving a ⭐ on the repository!</p>
</div>
