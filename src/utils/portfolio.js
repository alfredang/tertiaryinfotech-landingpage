import {
  HiAcademicCap,
  HiBookOpen,
  HiSparkles,
  HiCpuChip,
  HiBuildingOffice2,
  HiCurrencyDollar,
  HiHome,
  HiGlobeAlt,
  HiPuzzlePiece,
  HiWrench,
} from 'react-icons/hi2'

// Helper to generate URL-friendly slugs
const slug = (name) =>
  name
    .toLowerCase()
    .replace(/[—–]/g, '-')
    .replace(/[()]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const makeProject = (name, description, featured = false) => ({
  name,
  slug: slug(name),
  description,
  featured,
})

export const PORTFOLIO_CATEGORIES = [
  {
    title: 'Education',
    icon: HiAcademicCap,
    subcategories: [
      {
        label: 'Learning Platforms',
        items: [
          makeProject('AI Learning & Training Management System', 'AI-powered platform for managing courses, certifications, and training workflows at scale.', true),
          makeProject('LearnHub', 'Centralized learning hub with course management, progress tracking, and analytics.', true),
          makeProject('Learnify Childcare', 'Childcare-focused learning management system with parent engagement tools.', true),
          makeProject('Lumina Training Management System', 'Enterprise training management with scheduling, compliance tracking, and reporting.', true),
          makeProject('Learnify', 'Streamlined eLearning platform for delivering interactive online courses.'),
        ],
      },
      {
        label: 'Kids & Interactive',
        items: [
          makeProject('Educational Escape Rooms', 'Gamified learning through interactive virtual escape room experiences.'),
          makeProject('Musical Timer Countdown', 'Fun musical countdown timer designed for classroom activities and transitions.'),
          makeProject('Phonics AI', 'AI-powered phonics learning tool for early childhood literacy development.'),
          makeProject('PhonixQuest', 'Interactive phonics adventure game that makes learning to read engaging.'),
        ],
      },
      {
        label: 'Tutorials',
        items: [
          makeProject('AutoGen AI Agents Tutorial', 'Step-by-step guide to building multi-agent AI systems with AutoGen.'),
          makeProject('Google ADK Tutorial', 'Comprehensive tutorial for Google Agent Development Kit integration.'),
          makeProject('Langflow & Streamlit Tutorial', 'Learn to build AI workflows with Langflow and deploy with Streamlit.'),
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
          makeProject('Value Investment Academy', 'Educational platform for value investing strategies and stock analysis.', true),
          makeProject('Stock Analysis Telegram Agent', 'AI-powered Telegram bot for real-time stock analysis and alerts.'),
        ],
      },
      {
        label: 'Productivity Tools',
        items: [
          makeProject('Markdown To PDF Converter', 'Convert Markdown documents to professionally formatted PDFs.'),
          makeProject('Rich Text To Markdown Converter', 'Transform rich text content into clean Markdown format.'),
          makeProject('Strong Password Generator (MCP)', 'MCP-powered secure password generator with customizable rules.'),
          makeProject('Word/PPT To PDF Converter', 'Batch convert Word and PowerPoint files to PDF format.'),
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
          makeProject('AI HR Management System', 'Intelligent HR platform with AI-driven hiring, onboarding, and analytics.', true),
        ],
      },
      {
        label: 'Enterprise Tools',
        items: [
          makeProject('NotebookLM MCP Bridge', 'Bridge connecting NotebookLM with Model Context Protocol for enhanced AI workflows.'),
          makeProject('Tertiary Infotech Voice Agent', 'AI voice agent for automated customer support and information delivery.'),
        ],
      },
      {
        label: 'AI Creative Tools',
        items: [
          makeProject('Content Creators (CrewAI)', 'Multi-agent content creation system powered by CrewAI framework.'),
          makeProject('Groovy Dance Studio', 'AI-powered dance choreography and movement visualization tool.'),
          makeProject('Idea Galaxy', 'Creative ideation platform using AI to generate and refine ideas.'),
        ],
      },
      {
        label: 'Advanced Tech',
        items: [
          makeProject('LeRobot — AI Robotics', 'AI robotics platform for building and training intelligent robot agents.'),
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
          makeProject('Property Finder', 'AI-enhanced property search and recommendation engine.', true),
          makeProject('Property Advisor', 'Intelligent property advisory tool with market analysis and insights.'),
        ],
      },
      {
        label: 'Travel & Lifestyle',
        items: [
          makeProject('Recycle & Resell', 'Sustainable marketplace platform for recycling and reselling items.', true),
          makeProject('AI Trip Advisor', 'AI-powered travel planning and personalized trip recommendations.'),
          makeProject('EV Charging Points Singapore', 'Real-time EV charging station finder and availability tracker.'),
          makeProject('Hiking Advisor', 'Trail recommendation system with difficulty ratings and weather integration.'),
          makeProject('Potluck', 'Social dining platform for organizing and discovering potluck events.'),
        ],
      },
      {
        label: 'Sports & Wellness',
        items: [
          makeProject('I Am Good', 'Mental wellness companion app with mood tracking and AI support.'),
          makeProject('SquashPro', 'Squash coaching and performance tracking platform.'),
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
          makeProject('Futuristic Pong', 'Neon-styled Pong game with power-ups and AI opponents.'),
          makeProject('Kid-Friendly Sudoku', 'Colorful Sudoku puzzles designed for children learning logic.'),
          makeProject('Modern Frogger', 'Reimagined classic Frogger with modern graphics and mechanics.'),
          makeProject('Modern Snake', 'Updated Snake game with new modes and visual effects.'),
          makeProject('Neon Donkey Kong', 'Retro Donkey Kong with a futuristic neon aesthetic.'),
          makeProject('Neon Pac-Man', 'Classic Pac-Man reimagined with neon visuals and new levels.'),
          makeProject('Neon Tetris', 'Tetris with glowing neon blocks and modern sound design.'),
          makeProject('Pastel Space Invaders', 'Space Invaders with a soft pastel color palette and smooth animations.'),
          makeProject('Pixel Art Dungeon Crawler', 'Procedurally generated dungeon crawler with pixel art graphics.'),
          makeProject('Retro Street Fighter', 'Street fighter tribute with retro pixel art and arcade mechanics.'),
          makeProject('Story Creator (AutoGen + Chainlit)', 'AI-powered interactive story creation using AutoGen and Chainlit.'),
          makeProject('Tic-Tac-Toe AI', 'Tic-Tac-Toe with unbeatable AI opponent using minimax algorithm.'),
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
