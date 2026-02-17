import {
  HiAcademicCap,
  HiCurrencyDollar,
  HiBuildingOffice2,
  HiHome,
  HiPuzzlePiece,
} from 'react-icons/hi2'

// Helper to generate URL-friendly slugs
const slug = (name) =>
  name
    .toLowerCase()
    .replace(/[—–]/g, '-')
    .replace(/[()]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const makeProject = (name, description, { featured = false, demoUrl = '', githubUrl = '', techStack = [] } = {}) => ({
  name,
  slug: slug(name),
  description,
  featured,
  demoUrl,
  githubUrl,
  techStack,
})

export const PORTFOLIO_CATEGORIES = [
  {
    title: 'Education',
    icon: HiAcademicCap,
    subcategories: [
      {
        label: 'Learning Platforms',
        items: [
          makeProject('AI Learning & Training Management System', 'AI-powered platform for managing courses, certifications, and training workflows at scale. Integrates with SSG API for SkillsFuture Singapore ecosystem.', {
            featured: true,
            demoUrl: 'https://ai-lms-tms.vercel.app/',
            githubUrl: 'https://github.com/alfredang/AI-LMS-TMS',
            techStack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Google Gemini', 'SSG API'],
          }),
          makeProject('LearnHub', 'AI-powered Learning Management System for personalized and intelligent education workflows with centralized course management and analytics.', {
            featured: true,
            demoUrl: 'https://ai-lms-xi.vercel.app/',
            githubUrl: 'https://github.com/alfredang/ai-lms',
            techStack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'AI'],
          }),
          makeProject('Learnify Childcare', 'Corporate e-learning platform for childcare professionals in Singapore with parent engagement tools and Stripe payments.', {
            featured: true,
            demoUrl: 'https://alfredang.github.io/learnify-childcare/',
            githubUrl: 'https://github.com/alfredang/learnify-childcare',
            techStack: ['Next.js 16', 'TypeScript', 'Prisma', 'PostgreSQL', 'Stripe'],
          }),
          makeProject('Lumina Training Management System', 'Enterprise training management with scheduling, compliance tracking, and reporting for organizations.', {
            featured: true,
            githubUrl: 'https://github.com/alfredang/lumina',
            techStack: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
          }),
          makeProject('Learnify', 'Modern online learning marketplace with course creation, video streaming, Stripe payments, and role-based access for students, instructors, and admins.', {
            demoUrl: 'https://learnify-corporate-training-platform.netlify.app/',
            githubUrl: 'https://github.com/alfredang/Learnify',
            techStack: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Stripe'],
          }),
        ],
      },
      {
        label: 'Kids & Interactive',
        items: [
          makeProject('Educational Escape Rooms', 'Interactive browser-based educational escape rooms teaching AI, data, ethics, sustainability & coding through 5 themed rooms with 15+ puzzles.', {
            demoUrl: 'https://alfredang.github.io/escaperooms/',
            githubUrl: 'https://github.com/alfredang/escaperooms',
            techStack: ['HTML5', 'CSS3', 'JavaScript'],
          }),
          makeProject('Musical Timer Countdown', 'Polished, distraction-free countdown timer for classes, study blocks, and focused breaks with sound previews and looping alarm tracks.', {
            demoUrl: 'https://alfredang.github.io/musical-timer-countdown/',
            githubUrl: 'https://github.com/alfredang/musical-timer-countdown',
            techStack: ['HTML', 'CSS', 'JavaScript'],
          }),
          makeProject('Phonics AI', 'Interactive phonics learning app for ages 9-15 with games, AI features, and gamification powered by Gemini AI.', {
            demoUrl: 'https://alfredang.github.io/phonics-ai/',
            githubUrl: 'https://github.com/alfredang/phonics-ai',
            techStack: ['Next.js', 'Firebase', 'Google Gemini'],
          }),
          makeProject('PhonixQuest', 'Vibrant, AI-powered phonics learning adventure for kids. Master sounds, blending, and pronunciation with real-time feedback from Google Gemini.', {
            demoUrl: 'https://alfredang.github.io/PhonixQuest/',
            githubUrl: 'https://github.com/alfredang/PhonixQuest',
            techStack: ['HTML5', 'CSS3', 'JavaScript', 'Google Gemini'],
          }),
        ],
      },
      {
        label: 'Tutorials',
        items: [
          makeProject('AutoGen AI Agents Tutorial', 'Hands-on tutorial for building AI agents with Microsoft AutoGen — covering single agents, tools, multi-agent teams, and human-in-the-loop workflows.', {
            githubUrl: 'https://github.com/alfredang/autogen_tutorial',
            techStack: ['Python', 'AutoGen', 'OpenAI'],
          }),
          makeProject('Google ADK Tutorial', 'Collection of example AI agents built with Google Agent Development Kit (ADK) featuring multi-agent systems, tool integration, and various LLM providers.', {
            githubUrl: 'https://github.com/alfredang/gemini-adk-tutorial',
            techStack: ['Python', 'Google ADK', 'LLM'],
          }),
          makeProject('Langflow & Streamlit Tutorial', 'Learn to build AI workflows with Langflow and deploy interactive apps with Streamlit.', {
            githubUrl: 'https://github.com/alfredang/Langflow-and-Streamlit-Tutorial',
            techStack: ['Python', 'Langflow', 'Streamlit'],
          }),
        ],
      },
    ],
  },
  {
    title: 'Finance & Productivity',
    icon: HiCurrencyDollar,
    subcategories: [
      {
        label: 'Financial Tools',
        items: [
          makeProject('Value Investment Academy', 'AI-powered value investing tool with stock screening, financial anomaly detection (M-Score, Z-Score, F-Score), and automated investment report generation for US & Singapore markets.', {
            featured: true,
            demoUrl: 'https://value-investment-academy.streamlit.app/',
            githubUrl: 'https://github.com/alfredang/value-investment',
            techStack: ['Python', 'Streamlit', 'AI', 'Finance APIs'],
          }),
          makeProject('Stock Analysis Telegram Agent', 'Autonomous multi-agent system delivering real-time stock trade recommendations via Telegram with technical analysis, market sentiment, and AI decision-making.', {
            githubUrl: 'https://github.com/alfredang/stock_analysis_telegram_agent',
            techStack: ['Python', 'Telegram API', 'Multi-Agent AI'],
          }),
        ],
      },
      {
        label: 'Productivity Tools',
        items: [
          makeProject('Markdown To PDF Converter', 'Chrome extension to convert Markdown to beautifully styled PDF with live preview.', {
            githubUrl: 'https://github.com/alfredang/md2pdf-chrome-extension',
            techStack: ['JavaScript', 'Chrome Extension API'],
          }),
          makeProject('Rich Text To Markdown Converter', 'Chrome extension to convert rich text to GitHub Flavored Markdown. Paste from Word, Google Docs, or any webpage and get clean markdown instantly.', {
            githubUrl: 'https://github.com/alfredang/md-converter-chrome-extension',
            techStack: ['JavaScript', 'Chrome Extension API'],
          }),
          makeProject('Strong Password Generator (MCP)', 'MCP server for generating cryptographically secure passwords with customizable rules, strength analysis, and passphrase generation.', {
            githubUrl: 'https://github.com/alfredang/strong-password-generator-mcp',
            techStack: ['Python', 'FastMCP 2.0'],
          }),
          makeProject('Word/PPT To PDF Converter', 'Chrome extension to convert Word (.docx) and PowerPoint (.pptx) documents to PDF.', {
            githubUrl: 'https://github.com/alfredang/pdf-converter-chrome-extension',
            techStack: ['JavaScript', 'Chrome Extension API'],
          }),
        ],
      },
    ],
  },
  {
    title: 'HR & Technology',
    icon: HiBuildingOffice2,
    subcategories: [
      {
        label: 'HR Systems',
        items: [
          makeProject('AI HR Management System', 'AI-powered HR platform with employee management, leave tracking, Singapore CPF payroll, expense claims, and Gemini chatbot.', {
            featured: true,
            demoUrl: 'https://ai-hrm.vercel.app/',
            githubUrl: 'https://github.com/alfredang/ai-hrms',
            techStack: ['Next.js 14', 'TypeScript', 'Prisma', 'Neon Postgres', 'Google Gemini'],
          }),
        ],
      },
      {
        label: 'Enterprise Tools',
        items: [
          makeProject('NotebookLM MCP Bridge', 'Bridge connecting Google NotebookLM with Claude via MCP for full programmatic access to create notebooks, manage sources, and generate AI-powered content.', {
            githubUrl: 'https://github.com/alfredang/notebooklm-mcp',
            techStack: ['Python', 'MCP', 'NotebookLM API'],
          }),
          makeProject('Tertiary Infotech Voice Agent', 'AI voice agent landing page for automated customer support and real-time voice calls, powered by Retell.io.', {
            demoUrl: 'https://tertiary-voiceagent.vercel.app/',
            githubUrl: 'https://github.com/alfredang/voiceagent',
            techStack: ['React', 'Retell.io', 'Vercel'],
          }),
        ],
      },
      {
        label: 'AI Creative Tools',
        items: [
          makeProject('Content Creators (CrewAI)', 'Multi-agent AI content generation system using CrewAI with Streamlit interface. Research, write, and edit professional articles automatically.', {
            demoUrl: 'https://content-creators.streamlit.app/',
            githubUrl: 'https://github.com/alfredang/content-creators-crewai',
            techStack: ['Python', 'CrewAI', 'Streamlit'],
          }),
          makeProject('Groovy Dance Studio', 'AI-powered creative studio for dance generation, image creation/editing, media analysis, and intelligent chat powered by Google Gemini.', {
            demoUrl: 'https://groovydance-app.netlify.app/',
            githubUrl: 'https://github.com/alfredang/groovydance',
            techStack: ['React', 'Google Gemini', 'Netlify'],
          }),
          makeProject('Idea Galaxy', 'Space-themed idea visualization platform where ideas appear as glowing stars. Create, connect, and evolve ideas with AI-powered discovery.', {
            demoUrl: 'https://idea-galaxy.netlify.app/',
            githubUrl: 'https://github.com/alfredang/idea-galaxy',
            techStack: ['React', 'FastAPI', 'MongoDB'],
          }),
        ],
      },
      {
        label: 'Advanced Tech',
        items: [
          makeProject('LeRobot — AI Robotics', 'Robotics project integrating LeRobot framework with ChatGPT-4o Vision API for intelligent control of a LeKiwi mobile manipulator.', {
            githubUrl: 'https://github.com/alfredang/lerobot',
            techStack: ['Python', 'LeRobot', 'ROS2', 'GPT-4o Vision'],
          }),
        ],
      },
    ],
  },
  {
    title: 'Real Estate & Lifestyle',
    icon: HiHome,
    subcategories: [
      {
        label: 'Property',
        items: [
          makeProject('Property Finder', 'Full-stack PropertyGuru Singapore clone with property search, filters, SSR pages, user auth, favorites, and 120+ sample listings.', {
            featured: true,
            demoUrl: 'https://propertyguruking.netlify.app/',
            githubUrl: 'https://github.com/alfredang/propertyfinder',
            techStack: ['Next.js 14', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
          }),
          makeProject('Property Advisor', 'Intelligent property advisory tool with market analysis, property discovery, and management features.', {
            demoUrl: 'https://propertyadvisor-frontend.vercel.app/',
            githubUrl: 'https://github.com/alfredang/propertyadvisor',
            techStack: ['React', 'Node.js', 'Vercel'],
          }),
        ],
      },
      {
        label: 'Travel & Lifestyle',
        items: [
          makeProject('Recycle & Resell', 'Carousell-style marketplace for buying and selling second-hand items, promoting sustainability.', {
            featured: true,
            demoUrl: 'https://recycle-resell.netlify.app/',
            githubUrl: 'https://github.com/alfredang/recycle-resell',
            techStack: ['Next.js', 'Prisma', 'Netlify'],
          }),
          makeProject('AI Trip Advisor', 'Interactive AI-driven trip planning app with multi-agent orchestration generating personalized travel itineraries based on user preferences.', {
            demoUrl: 'https://trip-advisor-openrouter.streamlit.app/',
            githubUrl: 'https://github.com/alfredang/trip-advisor',
            techStack: ['Python', 'Streamlit', 'Multi-Agent AI'],
          }),
          makeProject('EV Charging Points Singapore', 'Interactive map of EV charging points in Singapore with real-time availability from LTA DataMall API.', {
            demoUrl: 'https://ev-charging-points-sg.vercel.app',
            githubUrl: 'https://github.com/alfredang/ev-charging-points-sg',
            techStack: ['Next.js', 'LTA DataMall API', 'Vercel'],
          }),
          makeProject('Hiking Advisor', 'Modern hiking trail finder with interactive maps, real-time weather, and an AI-powered assistant.', {
            demoUrl: 'https://hiking-advisor.netlify.app/',
            githubUrl: 'https://github.com/alfredang/hiking-advisor',
            techStack: ['Next.js 14', 'TypeScript', 'Google Gemini', 'Netlify'],
          }),
          makeProject('Potluck', 'Marketplace platform connecting home chefs with food lovers in Singapore. Book unique home dining experiences.', {
            demoUrl: 'https://potluck-ochre.vercel.app/',
            githubUrl: 'https://github.com/alfredang/potluck',
            techStack: ['Next.js', 'Vercel'],
          }),
        ],
      },
      {
        label: 'Sports & Wellness',
        items: [
          makeProject('I Am Good', 'Personal safety check-in app for individuals living alone with one-tap check-ins, configurable schedules, and automatic alerts to emergency contacts.', {
            demoUrl: 'https://iamgood-psi.vercel.app/',
            githubUrl: 'https://github.com/alfredang/iamgood',
            techStack: ['Next.js', 'Vercel'],
          }),
          makeProject('SquashPro', 'Squash match finder with court booking, opponent matching, Google OAuth, interactive maps, player ratings, and AI coaching tips.', {
            demoUrl: 'https://squashpro.vercel.app',
            githubUrl: 'https://github.com/alfredang/SquashPro',
            techStack: ['React', 'TypeScript', 'Supabase', 'Tailwind CSS'],
          }),
        ],
      },
    ],
  },
  {
    title: 'Others',
    icon: HiPuzzlePiece,
    subcategories: [
      {
        label: 'Games',
        items: [
          makeProject('Futuristic Pong', 'Sleek, futuristic Pong game with neon aesthetics, adaptive AI difficulty, and real-time Web Audio synthesis.', {
            demoUrl: 'https://alfredang.github.io/pong-game/',
            githubUrl: 'https://github.com/alfredang/pong-game',
            techStack: ['Vite', 'Tailwind CSS', 'JavaScript', 'Web Audio API'],
          }),
          makeProject('Kid-Friendly Sudoku', 'Colorful 9x9 Sudoku game with three difficulty levels, countdown timer, and click-to-play number pad.', {
            demoUrl: 'https://alfredang.github.io/sudoku/',
            githubUrl: 'https://github.com/alfredang/sudoku',
            techStack: ['HTML', 'CSS', 'JavaScript'],
          }),
          makeProject('Modern Frogger', 'Cute, modern remake of the classic Frogger game with smooth animations.', {
            demoUrl: 'https://alfredang.github.io/Frogger-game/',
            githubUrl: 'https://github.com/alfredang/Frogger-game',
            techStack: ['HTML', 'CSS', 'JavaScript'],
          }),
          makeProject('Modern Snake', 'Modern Snake game with smooth animations, particle effects, and polished visuals.', {
            demoUrl: 'https://alfredang.github.io/snake-game/',
            githubUrl: 'https://github.com/alfredang/snake-game',
            techStack: ['HTML5', 'CSS3', 'JavaScript'],
          }),
          makeProject('Neon Donkey Kong', 'Sleek, neon-inspired reimagining of the classic Donkey Kong arcade game.', {
            demoUrl: 'https://alfredang.github.io/donkey-kong-game/',
            githubUrl: 'https://github.com/alfredang/donkey-kong-game',
            techStack: ['HTML5 Canvas', 'JavaScript', 'Web Audio API'],
          }),
          makeProject('Neon Pac-Man', 'Sleek, modern Neon Pac-Man arcade game with smart ghost AI, responsive design, and programmatic sound effects.', {
            demoUrl: 'https://alfredang.github.io/pacman-game/',
            githubUrl: 'https://github.com/alfredang/pacman-game',
            techStack: ['HTML', 'CSS', 'JavaScript'],
          }),
          makeProject('Neon Tetris', 'Modern, browser-based Tetris game with responsive design and neon arcade visuals.', {
            demoUrl: 'https://alfredang.github.io/tetris-game/',
            githubUrl: 'https://github.com/alfredang/tetris-game',
            techStack: ['HTML', 'CSS', 'JavaScript'],
          }),
          makeProject('Pastel Space Invaders', 'Whimsical, pastel-themed reimagining of Space Invaders with smooth animations.', {
            demoUrl: 'https://alfredang.github.io/space-invader-game/',
            githubUrl: 'https://github.com/alfredang/space-invader-game',
            techStack: ['HTML5', 'JavaScript'],
          }),
          makeProject('Pixel Art Dungeon Crawler', 'Top-down pixel art dungeon crawler with elemental spells and 4 dungeon rooms.', {
            demoUrl: 'https://alfredang.github.io/pixelartgame/',
            githubUrl: 'https://github.com/alfredang/pixelartgame',
            techStack: ['HTML5 Canvas', 'JavaScript'],
          }),
          makeProject('Retro Street Fighter', '2D fighter with original pixel-art assets, custom animation engine, and smooth local PvP gameplay.', {
            demoUrl: 'https://alfredang.github.io/street-fighter-game/',
            githubUrl: 'https://github.com/alfredang/street-fighter-game',
            techStack: ['HTML5 Canvas', 'JavaScript'],
          }),
          makeProject('Story Creator (AutoGen + Chainlit)', 'Multi-agent interactive story creator with human-in-the-loop review using AutoGen and Chainlit.', {
            demoUrl: 'https://web-production-fba33.up.railway.app/',
            githubUrl: 'https://github.com/alfredang/story-creator-autogen-chainlit',
            techStack: ['Python', 'AutoGen', 'Chainlit', 'Railway'],
          }),
          makeProject('Tic-Tac-Toe AI', 'Sleek Tic-Tac-Toe game with unbeatable Minimax AI opponent, dark-mode UI, and smooth animations.', {
            demoUrl: 'https://alfredang.github.io/tic-tac-toe-game/',
            githubUrl: 'https://github.com/alfredang/tic-tac-toe-game',
            techStack: ['HTML', 'CSS', 'JavaScript'],
          }),
        ],
      },
    ],
  },
]

// Flat list of all projects for routing
export const ALL_PROJECTS = PORTFOLIO_CATEGORIES.flatMap((cat) =>
  cat.subcategories.flatMap((sub) =>
    sub.items.map((item) => ({
      ...item,
      category: cat.title,
      categoryIcon: cat.icon,
      subcategory: sub.label,
    }))
  )
)
