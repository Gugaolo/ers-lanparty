# 🎮 ERŠ ŠCV LAN Party

Official web application for organizing a LAN party event at  
**Electro and Computer School Velenje (ERŠ ŠCV)**.

The application provides event information, team registration, game selection, schedule, and rules in one place.

---

## 📌 Project Description

**ERŠ ŠCV LAN Party** is a web application designed for students and visitors of a school LAN party event.  
It serves as an information and registration platform that simplifies event organization and team sign-ups.

Main features:
- Event overview
- Team registration
- Multiple game selection
- Team and member listing
- Event schedule
- Tournament rules
- Organizer contact information

---

## 🎯 Project Purpose

The purpose of this project is to:
- demonstrate modern web development skills,
- use a real database in a real-world scenario,
- connect frontend and backend logic,
- practice full-stack application development.

This project was created as part of a school assignment.

---

## 🛠️ Technologies Used

- **Next.js 16 (App Router)**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Supabase** (database & authentication)
- **Vercel** (deployment)
- **pnpm** (package manager)

---

## 📂 Project Structure

app/

├─ page.tsx # home page

├─ teams/ # teams list

├─ prijava/ # team registration

├─ urnik/ # event schedule

├─ pravila/ # rules

├─ kontakt/ # contact page

└─ organizatorji/ # organizers


lib/

├─ supabaseServer.ts # Supabase server client

└─ utils.ts # helper functions


public/

└─ images/ # images and logos


styles/

└─ globals.css # global styles



## 🧑‍💻 Installation & Local Development

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Gugaolo/ers-lanparty.git
cd ers-lanparty
2️⃣ Install dependencies
bash
Copy code
pnpm install
3️⃣ Environment setup
Create a .env.local file in the project root:

env
Copy code
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxx
4️⃣ Run the development server
bash
Copy code
pnpm dev
The application will be available at:

arduino
Copy code
http://localhost:3000
🗄️ Database (Supabase)
The project uses Supabase as the backend service.

Main tables:
groups – registered teams

games – available games

Example columns in groups table:

group_name – team name

members – team members

games – selected games

created_at – registration date

🔐 Authentication
The application uses Supabase Authentication with Google Sign-In.
This allows users to authenticate securely without building a custom login system.

🎨 Design
Forced dark mode for consistent appearance

Colors inspired by the LAN party logo

Fully responsive layout (desktop & mobile)

🚀 Deployment
The project is deployed using Vercel:

Automatic builds on GitHub pushes

Connected to Supabase production database

👥 Author
Name: (your name)

Class: (e.g. R4A)

School: Electro and Computer School Velenje (ERŠ ŠCV)