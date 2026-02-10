# 🎮 ERŠ ŠCV LAN Party

> Official web platform for the **Electro and Computer School Velenje (ERŠ ŠCV)** LAN party event.

A modern, full-stack web application that simplifies event management, team registration, and real-time information sharing for students and participants.

---

## ✨ Features

- 🎯 **Event Overview** – Complete event details, schedule, and venue information
- 👥 **Team Registration** – Easy sign-up with team customization
- 🎮 **Multi-Game Support** – Choose from multiple tournament games
- 📊 **Live Team List** – View all registered teams and members
- 📅 **Event Schedule** – Detailed day-by-day breakdown with timings
- 📋 **Tournament Rules** – Clear guidelines for fair play and conduct
- 💬 **Contact & Community** – Direct organizer contact and Discord integration

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 16 (App Router), React, TypeScript |
| **Styling** | Tailwind CSS |
| **Backend & Database** | Supabase (PostgreSQL) |
| **Authentication** | Supabase Auth + Google OAuth |
| **Deployment** | Vercel |
| **Package Manager** | pnpm |
| **Testing** | Cypress (E2E & Component) |

---

## 📂 Project Structure

```
ers-lanparty/
├── app/
│   ├── page.tsx              # Homepage
│   ├── prijava/              # Team registration
│   ├── teams/                # Team listing & editing
│   ├── urnik/                # Event schedule
│   ├── pravila/              # Tournament rules
│   ├── kontakt/              # Contact information
│   ├── organizatorji/        # Organizer profiles
│   ├── login/                # Authentication
│   ├── signup/               # Account creation
│   ├── profile/              # User dashboard
│   ├── auth/callback/        # OAuth callback
│   ├── components/           # Reusable React components
│   ├── data/                 # Static data (schedule, etc.)
│   └── layout.tsx            # Root layout
├── lib/
│   ├── supabase.ts           # Browser Supabase client
│   ├── supabaseServer.ts     # Server-side Supabase client
│   └── supabaseServerClient.ts
├── cypress/
│   ├── e2e/                  # End-to-end tests
│   ├── component/            # Component tests
│   └── support/              # Test utilities
├── public/                   # Static assets
└── .env.local                # Environment variables (⚠️ not versioned)
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (`npm install -g pnpm`)
- Supabase account
- Git

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/Gugaolo/ers-lanparty.git
cd ers-lanparty
```

**2. Install dependencies**
```bash
pnpm install
```

**3. Set up environment variables**

Create a `.env.local` file in the project root:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

> 💡 Get these from your [Supabase dashboard](https://supabase.com/dashboard)

**4. Run the development server**
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Authentication

The app uses **Supabase Authentication** with:
- Email/Password signup & login
- Google OAuth sign-in
- Automatic session persistence

Users must authenticate to register teams and manage their submissions.

---

## 📝 Available Scripts

```bash
# Development
pnpm dev              # Start dev server on localhost:3000

# Production
pnpm build            # Build for production
pnpm start            # Start production server

# Testing
pnpm cypress:open     # Open Cypress test runner
pnpm cypress:run      # Run all tests headless

# Linting
pnpm lint             # Run ESLint
```

---

## 🎨 Design & Colors

The app uses a dark, neon-inspired color scheme:

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Accent | `#1A8CFF` | Buttons, highlights |
| Neon Cyan | `#00E0FF` | Headlines, glows |
| Light Blue | `#7BCBFF` | Secondary accents |
| Dark Background | `#02040A` | Page background |
| Soft Dark | `#0A0F1A` | Cards, sections |

---

## 🧪 Testing

The project includes Cypress tests for both **E2E** and **component** testing.

**Run tests:**
```bash
pnpm cypress:run
```

**Common test files:**
- `cypress/e2e/homepage.cy.ts` – Homepage functionality
- `cypress/e2e/teams.cy.ts` – Team listing
- `cypress/e2e/prijava.cy.ts` – Team registration
- `cypress/component/multiselect.cy.tsx` – Component tests

---

## 🚢 Deployment

The project is optimized for **Vercel**:

1. Push to GitHub
2. Connect repo to [Vercel](https://vercel.com)
3. Add environment variables
4. Auto-deploys on push

> **Live Demo:** [ers-lanparty.vercel.app](https://ers-lan-party.vercel.app)

---

## 📖 Key Pages

| Page | Route | Purpose |
|------|-------|---------|
| Home | `/` | Event overview |
| Team Registration | `/prijava` | Submit team |
| Teams List | `/teams` | View all teams |
| Edit Team | `/teams/edit` | Manage your team |
| Schedule | `/urnik` | Event timeline |
| Rules | `/pravila` | Tournament guidelines |
| Contact | `/kontakt` | Organizer info + Discord |
| Organizers | `/organizatorji` | Meet the team |
| Login | `/login` | Sign in |
| Sign Up | `/signup` | Create account |

---

## 🤝 Contributing

This is a school project. For feedback or improvements:

1. Open an issue
2. Create a feature branch
3. Submit a pull request

---

## 📄 License

School project for ERŠ ŠCV. For more info, contact the organizers.

---

## 👥 Team

**Organizers:**
- Gal Štravs (4. TRA)
- Tim Rednjak (4. TRA)
- Andraž Dimec (4. TRA)
- Tilen Zavolovšek (4. TRA)
- Jon Zorko Kotnik (4. TRA)

**Event:** LAN Party ERŠ ŠCV | **Date:** March 20-21 | **Location:** Gaudeamus

---

## 📞 Support

- 📧 **Email:** tim.rednjak@scv.si
- 🎮 **Discord:** [Join Server](https://discord.gg/Tr3TFd3XZe)
- 💬 **Contact Page:** [/kontakt](/kontakt)

---

**Made with ❤️ by ERŠ ŠCV students**