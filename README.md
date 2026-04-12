# 🦷 DentWise – AI-Powered Dental Assistant

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Space+Grotesk&size=28&duration=3000&pause=1000&color=E78A53&center=true&vCenter=true&width=600&lines=AI+Powered+Dental+Assistant;Voice+Based+Smart+Consultation;Modern+Full+Stack+Healthcare+App" alt="Typing SVG" />
</p>

<p align="center">
  <a href="https://dentwise-ai.sevalla.app/">
    <img src="https://img.shields.io/badge/Live-Demo-orange?style=for-the-badge&logo=vercel" />
  </a>
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma" />
  <img src="https://img.shields.io/badge/Clerk-Auth-purple?style=for-the-badge" />
  <img src="https://img.shields.io/badge/ElevenLabs-AI-green?style=for-the-badge" />
</p>

---

## ✨ Overview

DentWise is an intelligent AI-powered dental assistant that enables users to get instant dental advice, interact through voice, and seamlessly book appointments.

Built using a modern full-stack architecture, it combines conversational AI, real-time interaction, and a sleek UI to deliver a next-generation healthcare experience.

---

## 🚀 Features

### 🤖 AI Voice Assistant

* Real-time dental consultation
* Natural conversation powered by ElevenLabs
* Intelligent query handling

### 📅 Smart Appointment Booking

* AI extracts booking details automatically
* Seamless scheduling experience

### 👤 Secure Authentication

* Clerk-based login & signup
* User session management

### 📊 Interactive Dashboard

* View upcoming appointments
* Track dental activity

### 🎨 Modern UI/UX

* Fully responsive design
* Smooth animations & clean interface

---

## 🛠️ Tech Stack

| Category | Technologies                 |
| -------- | ---------------------------- |
| Frontend | Next.js, React, Tailwind CSS |
| Backend  | Node.js (API Routes), Prisma |
| Database | PostgreSQL                   |
| Auth     | Clerk                        |
| AI Voice | ElevenLabs                   |
| State    | TanStack Query               |

---

## 📁 Project Structure

```
dentwise/
├── prisma/                 # Database schema & migrations
├── public/                 # Static assets (images, icons)
├── src/
│   ├── app/                # Next.js App Router (pages, layouts, routes)
│   ├── components/         # Reusable UI & feature components
│   │   ├── dashboard/      # Dashboard-specific components
│   │   └── ui/             # Shared UI components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities, API calls, DB logic
│   │   ├── actions/        # Server actions
│   │   └── db/             # Database connection/config
│   └── middleware.ts       # Route protection & auth middleware
│
├── .gitignore
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_secret

DATABASE_URL=your_database_url

NEXT_PUBLIC_ELEVENLABS_API_KEY=your_key
NEXT_PUBLIC_ELEVENLABS_AGENT_ID=your_agent_id
```

---

## 🚀 Getting Started

### 1. Clone repo

```
git clone https://github.com/your-username/dentwise.git
cd dentwise
```

### 2. Install dependencies

```
npm install
```

### 3. Run project

```
npm run dev
```

👉 Runs on: http://localhost:3000

---

## 🌐 Live Demo

👉 https://dentwise-ai.sevalla.app/

---

## 🧠 Key Learnings

* Understanding Next.js server vs client rendering
* Implementing authentication with Clerk
* Integrating real-time AI voice systems
* Debugging production deployment issues
* Building scalable full-stack apps

---

## 🚧 Future Improvements

* AI call summaries
* Payment integration (Stripe)
* Notifications system
* Advanced analytics dashboard
* Mobile app support

---

## 🤝 Contributing

1. Fork the repo
2. Create a branch
3. Commit changes
4. Open a PR

---

## 📄 License

MIT License

---

## 👨‍💻 Authors

### 🧑‍💻 Rati Ranjan Sendha 
- Designed and developed the complete application architecture  
- Implemented AI integration, authentication, and core features  

GitHub: https://github.com/pegasus-x/

---

### 🧑‍💻 Pratham Bagri  
- Contributed to appointment booking functionality  
- Assisted in UI development and overall user experience improvements  

GitHub: https://github.com/prathambagri  

---

## ⭐ Support

If you like this project, give it a ⭐ and share it!
