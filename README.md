<div align="center">

# Tertiary Infotech Academy

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![Gemini AI](https://img.shields.io/badge/Gemini-2.5_Flash-4285F4?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

**Enterprise-grade portfolio website with AI chatbot & automated contact management.**

[Live Demo](https://tertiaryinfo.tech) · [Report Bug](https://github.com/alfredang/tertiaryinfotech-landingpage/issues) · [Request Feature](https://github.com/alfredang/tertiaryinfotech-landingpage/issues)

</div>

---

## Screenshot

![Screenshot](screenshot.png)

---

## About

**Tertiary Infotech Academy** is a leading provider of professional IT training and custom software development in Singapore. This full-stack portfolio website showcases their services, portfolio projects, and provides an AI-powered chatbot for visitor assistance with automated email contact management.

### Key Features

- ✨ **AI Chatbot** powered by Google Gemini 2.5 Flash with company knowledge base
- 📧 **Smart Contact Form** with Gmail OAuth2 integration for automated email delivery
- 🎨 **Dark Theme** with neon blue/cyan/purple accents and glassmorphism design
- 📱 **Portfolio Showcase** with detailed project pages, live demos, and GitHub links
- 🔍 **SEO Optimized** with react-helmet-async for dynamic meta tags
- 🎬 **Smooth Animations** powered by Framer Motion with scroll-reveal effects
- 🌐 **Multi-Page Routing** with React Router for seamless navigation
- 📲 **Fully Responsive** mobile-first design across all breakpoints
- 🚀 **Production Deployed** on Coolify with separate frontend/backend architecture

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | React 19, React Router 7, JSX |
| **Build Tool** | Vite 7 |
| **Styling** | Tailwind CSS 3.4 |
| **Animation** | Framer Motion 12 |
| **Icons** | React Icons (Heroicons 2, Font Awesome) |
| **SEO** | react-helmet-async |
| **Backend** | Express.js 5, Node.js 22 |
| **AI/LLM** | Google Gemini 2.5 Flash |
| **Email** | Nodemailer with Gmail OAuth2 |
| **APIs** | Google Generative AI SDK, Google OAuth2 |
| **Deployment** | Coolify (Frontend + Backend) |
| **Language** | JavaScript (ES6+) |

---

## Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    Browser / User                         │
├──────────────────────────────────────────────────────────┤
│              React 19 + Vite 7 (Frontend)                │
│                https://tertiaryinfo.tech                 │
├─────────────┬──────────────┬─────────────────────────────┤
│   Layout    │   Sections   │       UI Components         │
│   ------    │   --------   │       -------------         │
│   Navbar    │   Hero       │   GlassCard                 │
│   Mobile    │   About      │   GlowButton                │
│   Menu      │   Services   │   ServiceCard               │
│   Footer    │   WhyUs      │   ScrollReveal              │
│   Portfolio │   Contact    │   ChatBot (Gemini)          │
│   Mega Menu │   Portfolio  │   ContactForm (OAuth2)      │
├─────────────┴──────────────┴─────────────────────────────┤
│         Tailwind CSS + Framer Motion + React Router      │
└──────────────────────────┬───────────────────────────────┘
                           │ API Requests
                           ↓
┌──────────────────────────────────────────────────────────┐
│              Express.js API (Backend)                    │
│              https://api.tertiaryinfo.tech               │
├──────────────────────────────────────────────────────────┤
│   POST /api/chat      →  Gemini 2.5 Flash AI           │
│   POST /api/contact   →  Gmail OAuth2 Email Sender      │
├──────────────────────────────────────────────────────────┤
│   Environment: GEMINI_API_KEY, GMAIL_OAUTH_CREDENTIALS  │
└──────────────────────────────────────────────────────────┘
                           │
                           ↓
┌──────────────────────────────────────────────────────────┐
│              External Services                           │
├──────────────────────────────────────────────────────────┤
│   Google Gemini AI      →  Chatbot Responses            │
│   Gmail API (OAuth2)    →  Contact Form Emails          │
└──────────────────────────────────────────────────────────┘
```

---

## Project Structure

```
tertiaryinfotech-website/
├── index.html                          # Entry HTML with meta tags & fonts
├── package.json                        # Dependencies & scripts
├── tailwind.config.js                  # Custom colors, shadows, animations
├── postcss.config.js                   # PostCSS with Tailwind
├── vite.config.js                      # Vite configuration
├── server.js                           # Express backend API (chatbot + email)
├── Dockerfile.backend                  # Backend deployment config
├── .env                                # Environment variables (gitignored)
├── public/
│   └── favicon.svg                     # Gradient favicon
└── src/
    ├── main.jsx                        # React entry point
    ├── App.jsx                         # Root component with routing
    ├── index.css                       # Tailwind directives & global styles
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.jsx              # Sticky nav with portfolio mega menu
    │   │   ├── PortfolioMegaMenu.jsx   # Dropdown portfolio preview
    │   │   ├── MobileMenu.jsx          # Full-screen slide-in menu
    │   │   ├── Footer.jsx              # 4-column footer with links
    │   │   └── Container.jsx           # Max-width wrapper
    │   ├── sections/
    │   │   ├── HeroSection.jsx         # Animated hero with gradient orbs
    │   │   ├── AboutSection.jsx        # Company intro with stat cards
    │   │   ├── ServicesSection.jsx     # TMS, LMS, AI service cards
    │   │   ├── WhyChooseUs.jsx         # 6-item feature grid
    │   │   └── ContactSection.jsx      # Gmail OAuth2 contact form
    │   ├── ui/
    │   │   ├── AnimatedBackground.jsx  # Floating gradient orbs
    │   │   ├── ChatBot.jsx             # AI chatbot with Gemini integration
    │   │   ├── FeatureItem.jsx         # Why Choose Us grid item
    │   │   ├── GlassCard.jsx           # Glassmorphism card
    │   │   ├── GlowButton.jsx          # Glowing CTA button
    │   │   ├── ScrollReveal.jsx        # Scroll-triggered animation
    │   │   ├── SectionHeading.jsx      # Section title with gradient
    │   │   └── ServiceCard.jsx         # Service card with hover glow
    │   └── seo/
    │       └── SEO.jsx                 # Dynamic meta tags with Helmet
    ├── pages/
    │   ├── HomePage.jsx                # Main landing page
    │   ├── PortfolioPage.jsx           # Portfolio grid page
    │   └── ProjectPage.jsx             # Individual project details
    ├── hooks/
    │   ├── useScrollPosition.js        # Navbar background on scroll
    │   └── useFormValidation.js        # Form state & validation
    └── utils/
        ├── animations.js               # Framer Motion variant factories
        ├── constants.js                # Nav links, services, features data
        └── portfolio.js                # Portfolio projects database
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+ and **npm** 9+
- **Google Cloud Console** account (for Gmail OAuth2 and Gemini API)

### Installation

```bash
# Clone the repository
git clone https://github.com/alfredang/tertiaryinfotech-landingpage.git

# Navigate to the project
cd tertiaryinfotech-landingpage

# Install dependencies
npm install
```

### Environment Setup

Create a `.env` file in the root directory:

```env
# Gmail OAuth2 Configuration
GMAIL_USER=your-email@gmail.com
GMAIL_CLIENT_ID=your-google-client-id
GMAIL_CLIENT_SECRET=your-google-client-secret
GMAIL_REFRESH_TOKEN=your-refresh-token

# Server Port
PORT=3001

# API URL (for frontend to connect to backend)
VITE_API_URL=http://localhost:3001

# Gemini API Key
GEMINI_API_KEY=your-gemini-api-key
```

**To get OAuth credentials:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Gmail API
4. Create OAuth 2.0 credentials
5. Generate refresh token using OAuth Playground

**To get Gemini API key:**
1. Go to [Google AI Studio](https://ai.google.dev)
2. Create an API key
3. Copy and paste into `.env`

### Running Locally

```bash
# Run both frontend and backend simultaneously
npm run dev:all

# Or run separately:
npm run dev      # Frontend only (Vite)
npm run server   # Backend only (Express)
```

- **Frontend**: http://localhost:5176
- **Backend API**: http://localhost:3001/api

### Production Build

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

---

## Deployment

### Coolify (Production Setup)

**Backend Deployment:**

1. Create a new service in Coolify → Docker
2. Point to your GitHub repository
3. Use `Dockerfile.backend` for build configuration
4. Set environment variables:
   ```
   GMAIL_USER=...
   GMAIL_CLIENT_ID=...
   GMAIL_CLIENT_SECRET=...
   GMAIL_REFRESH_TOKEN=...
   GEMINI_API_KEY=...
   PORT=3001
   ```
5. Configure domain: `api.tertiaryinfo.tech`
6. Deploy

**Frontend Deployment:**

1. Create a new service in Coolify → Static Site
2. Point to your GitHub repository
3. Build command: `npm run build`
4. Install command: `npm install --legacy-peer-deps`
5. Set environment variable:
   ```
   VITE_API_URL=https://api.tertiaryinfo.tech
   ```
6. Configure domain: `tertiaryinfo.tech`
7. Deploy

### Vercel (Alternative)

```bash
# Frontend
npx vercel

# Backend (separate deployment)
npx vercel --cwd . --prod
```

### Docker

```bash
# Build and run backend
docker build -f Dockerfile.backend -t tertiaryinfotech-api .
docker run -p 3001:3001 --env-file .env tertiaryinfotech-api

# Build and run frontend
docker build -t tertiaryinfotech-web .
docker run -p 80:80 tertiaryinfotech-web
```

---

## API Endpoints

### `POST /api/chat`

Chat with the AI assistant powered by Gemini 2.5 Flash.

**Request:**
```json
{
  "message": "What services do you offer?",
  "history": [
    { "role": "user", "content": "Hello" },
    { "role": "assistant", "content": "Hi! How can I help?" }
  ]
}
```

**Response:**
```json
{
  "response": "We offer professional IT training, corporate training solutions...",
  "success": true
}
```

### `POST /api/contact`

Send contact form submissions via Gmail OAuth2.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Inc",
  "message": "I'm interested in your training programs."
}
```

**Response:**
```json
{
  "success": true,
  "messageId": "<email-id>",
  "message": "Email sent successfully"
}
```

---

## Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

For major changes, please open an [issue](https://github.com/alfredang/tertiaryinfotech-landingpage/issues) first to discuss what you'd like to change.

---

## Developed By

**Tertiary Infotech Academy Pte. Ltd.**

📍 12 Woodlands Square, #07-85/86/87, Woods Square Tower 1, Singapore 737715
📧 sales@tertiarycourses.com.sg
🌐 https://tertiaryinfo.tech
🏢 UEN: 201200606W

---

## Acknowledgements

- [React](https://react.dev) — UI library
- [Vite](https://vite.dev) — Build tool
- [Tailwind CSS](https://tailwindcss.com) — Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) — Animation library
- [React Icons](https://react-icons.github.io/react-icons/) — Icon library
- [React Router](https://reactrouter.com) — Client-side routing
- [Google Gemini AI](https://ai.google.dev) — AI chatbot
- [Nodemailer](https://nodemailer.com) — Email sending
- [Coolify](https://coolify.io) — Deployment platform

---

<div align="center">

**If you found this useful, please consider giving it a ⭐**

</div>
