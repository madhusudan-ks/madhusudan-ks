// src/features/chatbot/services/intentMatcher.ts
import { portfolioKnowledge } from '../data/portfolioKnowledge.ts';
import type {
  BotResponse,
  IntentDefinition,
  IntentMatchResult,
} from '../types/chatbot.types.ts';

/**
 * Normalizes input text: lowercases, expands technical symbols, removes punctuation, collapses whitespace.
 */
export function normalizeText(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/c#/g, 'csharp')
    .replace(/\.net/g, 'dotnet')
    .replace(/node\.js/g, 'nodejs')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Common query synonyms and domain phrase expansions.
 */
const SYNONYM_MAP: Record<string, string> = {
  exp: 'experience',
  background: 'experience',
  employment: 'experience',
  career: 'experience',
  job: 'experience',
  jobs: 'experience',
  work: 'experience',
  history: 'experience',
  tech: 'skills',
  stack: 'skills',
  technologies: 'skills',
  frameworks: 'skills',
  languages: 'skills',
  tools: 'skills',
  works: 'projects',
  portfolio: 'projects',
  creations: 'projects',
  apps: 'projects',
  demos: 'projects',
  showcase: 'projects',
  built: 'projects',
  build: 'projects',
  mail: 'contact',
  email: 'contact',
  reach: 'contact',
  call: 'contact',
  phone: 'contact',
  connect: 'contact',
  touch: 'contact',
  hire: 'contact',
  hiring: 'contact',
  school: 'education',
  college: 'education',
  university: 'education',
  degree: 'education',
  academics: 'education',
  study: 'education',
  qualification: 'education',
  qualifications: 'education',
  cert: 'certifications',
  certs: 'certifications',
  certificate: 'certifications',
  certificates: 'certifications',
  certified: 'certifications',
  awards: 'achievements',
  accomplishments: 'achievements',
  highlights: 'achievements',
  cv: 'resume',
  blog: 'articles',
  blogs: 'articles',
  posts: 'articles',
  stream: 'articles',
  writing: 'articles',
  writings: 'articles',
  read: 'articles',
};

/**
 * Expand query tokens with synonyms for higher matching recall.
 */
export function expandTokens(normalized: string): string[] {
  const words = normalized.split(' ').filter(Boolean);
  const expanded: string[] = [];

  for (const word of words) {
    expanded.push(word);
    if (SYNONYM_MAP[word] && SYNONYM_MAP[word] !== word) {
      expanded.push(SYNONYM_MAP[word]);
    }
  }

  return expanded;
}

// Predefined Intents Registry
export const INTENTS: IntentDefinition[] = [
  // 1. Greetings
  {
    id: 'greeting',
    name: 'Greeting',
    phrases: [
      'hi',
      'hello',
      'hey',
      'greetings',
      'good morning',
      'good afternoon',
      'good evening',
      'whats up',
      'yo',
    ],
    patterns: [/^(hi|hello|hey|greetings|yo)\b/i],
    keywords: [
      { word: 'hi', weight: 15 },
      { word: 'hello', weight: 15 },
      { word: 'hey', weight: 15 },
      { word: 'welcome', weight: 10 },
      { word: 'greetings', weight: 15 },
    ],
    generateResponse: (): BotResponse => ({
      text: `Hello! 👋 I'm Madhusudan's portfolio assistant. I can answer questions about his technical skills, projects, work experience, articles, and contact info. How can I help you today?`,
      suggestions: [
        'Tell me about Madhusudan',
        'What is your tech stack?',
        'Show me your projects',
        'Where have you worked?',
        'How can I contact you?',
      ],
    }),
  },

  // 2. Help / Capabilities
  {
    id: 'help',
    name: 'Help & Capabilities',
    phrases: [
      'help',
      'what can you do',
      'options',
      'menu',
      'how to use',
      'what do you know',
    ],
    patterns: [/what (can|do) you do/i, /how can you help/i],
    keywords: [
      { word: 'help', weight: 15 },
      { word: 'options', weight: 12 },
      { word: 'commands', weight: 12 },
      { word: 'capabilities', weight: 12 },
    ],
    generateResponse: (): BotResponse => ({
      text: `I'm a client-side portfolio engine trained on Madhusudan's verified professional information. You can ask me about:\n\n• **Skills**: Frontend, Backend, Databases, Cloud & DevOps, System Design\n• **Projects**: Biomedical Lab Tool (PhysioEx), My Diet Analysis, SSO Auth Platform, DevSpace\n• **Experience**: Roles at Excelsoft Technologies & Audaz Learning\n• **Articles**: Published insights on system design, microservices & security\n• **Contact**: Email, LinkedIn, GitHub, and résumé requests`,
      suggestions: [
        'Key technical skills',
        'Featured projects',
        'Work experience',
        'Contact details',
      ],
    }),
  },

  // 3. About / Introduction
  {
    id: 'about',
    name: 'About & Bio',
    phrases: [
      'who are you',
      'who is madhusudan',
      'tell me about yourself',
      'about madhusudan',
      'tell me about madhusudan',
      'introduce yourself',
      'bio',
      'summary',
      'profile',
    ],
    patterns: [
      /tell me about (yourself|madhusudan)/i,
      /who is madhusudan/i,
      /who are you/i,
    ],
    keywords: [
      { word: 'about', weight: 12 },
      { word: 'bio', weight: 15 },
      { word: 'summary', weight: 12 },
      { word: 'introduction', weight: 14 },
      { word: 'madhusudan', weight: 10 },
      { word: 'profile', weight: 10 },
      { word: 'yourself', weight: 10 },
    ],
    generateResponse: (): BotResponse => ({
      text: `${portfolioKnowledge.owner.name} is a ${portfolioKnowledge.owner.titles.join(
        ' & '
      )} based in ${portfolioKnowledge.owner.currentLocation}.\n\n${
        portfolioKnowledge.owner.summary
      }`,
      links: [
        {
          label: 'LinkedIn Profile',
          url: portfolioKnowledge.owner.linkedin,
          isExternal: true,
        },
        {
          label: 'GitHub Profile',
          url: portfolioKnowledge.owner.github,
          isExternal: true,
        },
      ],
      tags: ['React', 'TypeScript', 'Java', 'Spring Boot', '.NET Core', 'PostgreSQL'],
      suggestions: [
        'What is your tech stack?',
        'Show me your projects',
        'Tell me about your experience',
        'How can I reach you?',
      ],
    }),
  },

  // 4. Role & Career Objectives
  {
    id: 'role_objective',
    name: 'Current Role & Objective',
    phrases: [
      'what is your current role',
      'what is your title',
      'what position are you looking for',
      'what roles do you do',
      'current job',
    ],
    patterns: [/current role/i, /what (job|position|role)/i],
    keywords: [
      { word: 'role', weight: 12 },
      { word: 'position', weight: 12 },
      { word: 'title', weight: 10 },
      { word: 'objective', weight: 12 },
      { word: 'current', weight: 8 },
    ],
    generateResponse: (): BotResponse => ({
      text: `Madhusudan is currently working as an **Associate Software Engineer (Full-stack)** at Excelsoft Technologies Ltd. in Mysore, India.\n\nHe is actively building scalable full-stack applications with React, TypeScript, Spring Boot, Java, and cloud platforms.`,
      tags: ['Associate Software Engineer', 'Full-stack', 'Excelsoft Technologies'],
      suggestions: [
        'Excelsoft responsibilities',
        'Frontend expertise',
        'Backend expertise',
      ],
    }),
  },

  // 5. Skills - General / All
  {
    id: 'skills_all',
    name: 'Technical Skills Overview',
    phrases: [
      'what are your skills',
      'what is your tech stack',
      'tech stack',
      'what technologies do you know',
      'list your skills',
      'skills',
      'technologies',
    ],
    patterns: [/what (are your|is your) (skills|tech stack)/i, /technologies/i],
    keywords: [
      { word: 'skills', weight: 18 },
      { word: 'stack', weight: 15 },
      { word: 'technologies', weight: 16 },
      { word: 'frameworks', weight: 14 },
      { word: 'languages', weight: 14 },
    ],
    negativeKeywords: ['project', 'projects', 'company', 'contact'],
    generateResponse: (): BotResponse => {
      const formattedCategories = portfolioKnowledge.skillCategories
        .map(
          (c) =>
            `• **${c.category}**: ${c.skills.slice(0, 5).join(', ')}${
              c.skills.length > 5 ? '…' : ''
            }`
        )
        .join('\n');

      return {
        text: `Here is an overview of Madhusudan's core technical competencies across the stack:\n\n${formattedCategories}`,
        tags: [
          'React',
          'TypeScript',
          'Java',
          'Spring Boot',
          '.NET Core',
          'PostgreSQL',
          'Docker',
          'AWS S3',
        ],
        suggestions: [
          'Frontend skills',
          'Backend skills',
          'Database technologies',
          'Cloud & DevOps',
        ],
      };
    },
  },

  // 6. Skills - Frontend
  {
    id: 'skills_frontend',
    name: 'Frontend Skills',
    phrases: [
      'frontend skills',
      'react skills',
      'typescript skills',
      'ui skills',
      'javascript experience',
      'css skills',
    ],
    patterns: [/front\s?end/i, /react/i, /typescript/i, /javascript/i],
    keywords: [
      { word: 'frontend', weight: 18 },
      { word: 'react', weight: 15 },
      { word: 'typescript', weight: 14 },
      { word: 'javascript', weight: 12 },
      { word: 'redux', weight: 12 },
      { word: 'ui', weight: 10 },
      { word: 'gsap', weight: 12 },
      { word: 'css', weight: 10 },
      { word: 'scss', weight: 10 },
      { word: 'mui', weight: 10 },
      { word: 'vite', weight: 10 },
    ],
    generateResponse: (): BotResponse => {
      const fe = portfolioKnowledge.skillCategories.find(
        (c) => c.category === 'Frontend'
      );
      const skillsList = fe ? fe.skills.join(', ') : '';
      return {
        text: `**Frontend Development Expertise:**\n\n${skillsList}\n\nMadhusudan has extensive experience building responsive Single Page Applications (SPAs) with React (18 & 19), Redux Toolkit, complex interactive Drag-and-Drop UIs, smooth GSAP animations, Material UI, and React Router v7.`,
        tags: ['React 18/19', 'TypeScript', 'Redux Toolkit', 'MUI', 'GSAP', 'Vite'],
        suggestions: [
          'Biomedical Lab Tool project',
          'My Diet Analysis project',
          'Backend skills',
        ],
      };
    },
  },

  // 7. Skills - Backend
  {
    id: 'skills_backend',
    name: 'Backend Skills',
    phrases: [
      'backend skills',
      'java skills',
      'spring boot experience',
      'dotnet skills',
      'c# experience',
      'api experience',
      'rest api',
    ],
    patterns: [/back\s?end/i, /spring boot/i, /java\b/i, /\.net/i, /c#/i],
    keywords: [
      { word: 'backend', weight: 18 },
      { word: 'java', weight: 15 },
      { word: 'spring', weight: 15 },
      { word: 'boot', weight: 12 },
      { word: 'dotnet', weight: 15 },
      { word: 'csharp', weight: 15 },
      { word: 'c#', weight: 15 },
      { word: 'node', weight: 10 },
      { word: 'api', weight: 12 },
      { word: 'jwt', weight: 10 },
      { word: 'microservices', weight: 12 },
    ],
    generateResponse: (): BotResponse => {
      const be = portfolioKnowledge.skillCategories.find((c) =>
        c.category.includes('Backend')
      );
      const skillsList = be ? be.skills.join(', ') : '';
      return {
        text: `**Backend & API Engineering Expertise:**\n\n${skillsList}\n\nMadhusudan builds enterprise-grade backend services with Spring Boot and .NET Core. He has built secure authentication flows using JWTs, HttpOnly cookies, RBAC, and CAS protocol Single Sign-On (SSO).`,
        tags: ['Java', 'Spring Boot', '.NET Core', 'C#', 'REST APIs', 'JWT', 'RBAC'],
        suggestions: [
          'SSO Platform project',
          'Database skills',
          'Cloud & DevOps skills',
        ],
      };
    },
  },

  // 8. Skills - Database
  {
    id: 'skills_database',
    name: 'Database Skills',
    phrases: [
      'database skills',
      'sql experience',
      'postgresql',
      'mysql',
      'mongodb',
      'redis',
    ],
    patterns: [/databases?/i, /sql/i, /postgresql/i, /mongodb/i],
    keywords: [
      { word: 'database', weight: 18 },
      { word: 'databases', weight: 18 },
      { word: 'sql', weight: 15 },
      { word: 'postgresql', weight: 16 },
      { word: 'mysql', weight: 14 },
      { word: 'mongodb', weight: 14 },
      { word: 'redis', weight: 14 },
    ],
    generateResponse: (): BotResponse => ({
      text: `**Databases & Storage:**\n\n• **PostgreSQL**: Primary relational database used in biomedical and diet analysis projects.\n• **MySQL**: Used in customer account tracker and backend CRUD apps.\n• **MongoDB**: NoSQL database for document-oriented storage.\n• **Redis**: In-memory caching and session store.`,
      tags: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
      suggestions: [
        'Customer Account Tracker project',
        'Backend skills',
        'Cloud & DevOps',
      ],
    }),
  },

  // 9. Skills - Cloud & DevOps
  {
    id: 'skills_cloud',
    name: 'Cloud & DevOps Skills',
    phrases: [
      'cloud skills',
      'devops experience',
      'aws experience',
      'docker skills',
      'kubernetes',
      'deployment',
    ],
    patterns: [/cloud/i, /devops/i, /aws/i, /docker/i, /kubernetes/i],
    keywords: [
      { word: 'cloud', weight: 16 },
      { word: 'devops', weight: 16 },
      { word: 'aws', weight: 16 },
      { word: 's3', weight: 12 },
      { word: 'ec2', weight: 10 },
      { word: 'docker', weight: 15 },
      { word: 'kubernetes', weight: 14 },
      { word: 'nginx', weight: 12 },
      { word: 'cloudflare', weight: 12 },
    ],
    generateResponse: (): BotResponse => ({
      text: `**Cloud, DevOps & Deployment:**\n\n• **AWS (S3, EC2)**: Cloud file storage, signed URL asset serving, EC2 hosting.\n• **Docker & Containerization**: Multi-stage Docker builds paired with Nginx for production-grade React apps.\n• **Kubernetes & Git**: Container orchestration, Git workflows, CI/CD pipelines.\n• **Cloudflare Pages**: Fast static SPA deployment with continuous deployment triggers.`,
      tags: ['AWS S3', 'Docker', 'Kubernetes', 'Nginx', 'Cloudflare Pages', 'Git'],
      suggestions: [
        'Tell me about your projects',
        'Frontend skills',
        'Backend skills',
      ],
    }),
  },

  // 10. Projects - All
  {
    id: 'projects_all',
    name: 'Projects Overview',
    phrases: [
      'tell me about your projects',
      'what projects have you built',
      'show me your projects',
      'list projects',
      'projects',
      'apps you built',
    ],
    patterns: [/what projects/i, /show (me )?projects/i, /tell me about projects/i],
    keywords: [
      { word: 'projects', weight: 18 },
      { word: 'portfolio', weight: 12 },
      { word: 'apps', weight: 12 },
      { word: 'creations', weight: 12 },
      { word: 'built', weight: 10 },
    ],
    negativeKeywords: ['experience', 'company', 'contact'],
    generateResponse: (): BotResponse => {
      const projectList = portfolioKnowledge.projects
        .map(
          (p) =>
            `• **${p.title}** (${p.status.toUpperCase()}): ${p.techStack
              .slice(0, 4)
              .join(', ')}\n  ${p.description[0]}`
        )
        .join('\n\n');

      return {
        text: `Here are key projects delivered and maintained by Madhusudan:\n\n${projectList}`,
        suggestions: [
          'Biomedical Lab Tool',
          'My Diet Analysis',
          'SSO Platform',
          'DevSpace Platform',
        ],
      };
    },
  },

  // 11. Specific Project: Biomedical Lab Tool
  {
    id: 'project_physioex',
    name: 'Biomedical Lab Tool (PhysioEx)',
    phrases: [
      'biomedical lab tool',
      'physioex',
      'interactive lab',
      'lab simulation',
      'dnd project',
    ],
    patterns: [/physioex/i, /biomedical/i, /lab simulation/i],
    keywords: [
      { word: 'biomedical', weight: 18 },
      { word: 'physioex', weight: 20 },
      { word: 'simulation', weight: 14 },
      { word: 'dnd', weight: 14 },
      { word: 'lab', weight: 12 },
    ],
    generateResponse: (): BotResponse => {
      const p = portfolioKnowledge.projects.find((item) => item.id === '1');
      return {
        text: `**${p?.title || 'Interactive Biomedical Lab Tool'}**\n\n• Developed advanced draggable React UI components improving student lab completion by ~35%.\n• Integrated Spring Boot backend with PostgreSQL, Amazon S3, and role-based access control.\n• Implemented real-time result tracking and instructor notifications, cutting review overhead by ~40%.\n• Built realistic lab experiment simulations with interactive viva MCQs.`,
        links: p?.links.app
          ? [
              {
                label: 'View Pearson PhysioEx Catalog',
                url: p.links.app,
                isExternal: true,
              },
            ]
          : [],
        tags: ['React', 'TypeScript', 'Redux', 'DnD', 'Spring Boot', 'PostgreSQL', 'AWS S3'],
        suggestions: [
          'My Diet Analysis project',
          'SSO Platform project',
          'Work experience at Excelsoft',
        ],
      };
    },
  },

  // 12. Specific Project: Nutrition & Diet Analysis
  {
    id: 'project_diet',
    name: 'Nutrition & Diet Analysis App',
    phrases: [
      'my diet analysis',
      'nutrition app',
      'diet analysis',
      'diet tracking',
    ],
    patterns: [/diet/i, /nutrition/i, /mydietanalysis/i],
    keywords: [
      { word: 'diet', weight: 18 },
      { word: 'nutrition', weight: 18 },
      { word: 'tracking', weight: 10 },
      { word: 'exceljs', weight: 14 },
    ],
    generateResponse: (): BotResponse => {
      const p = portfolioKnowledge.projects.find((item) => item.id === '2');
      return {
        text: `**${p?.title || 'Nutrition & Activity Tracking App'}**\n\n• Delivered a modern React 18 + TypeScript SPA with Vite, Redux Toolkit, MUI, and React Router v7.\n• Integrated enterprise SSO (piSession/IES) with protected routes and token interceptors.\n• Built interactive Charts, analytics dashboards, and ExcelJS/PDF print exports, cutting reporting effort by ~60%.\n• Improved frontend performance by ~25% through memoization, lazy loading, and request batching.`,
        links: p?.links.app
          ? [
              {
                label: 'View My Diet Analysis Product',
                url: p.links.app,
                isExternal: true,
              },
            ]
          : [],
        tags: ['React 18', 'TypeScript', 'Redux Toolkit', 'MUI', 'Spring Boot', 'ExcelJS'],
        suggestions: [
          'Biomedical Lab Tool project',
          'SSO Platform project',
          'DevSpace Platform',
        ],
      };
    },
  },

  // 13. Specific Project: Centralized SSO Platform
  {
    id: 'project_sso',
    name: 'Centralized SSO Platform',
    phrases: [
      'sso project',
      'single sign on',
      'authentication platform',
      'centralized authentication',
      'cas protocol',
    ],
    patterns: [/sso/i, /single sign on/i, /auth (project|system)/i, /cas protocol/i],
    keywords: [
      { word: 'sso', weight: 20 },
      { word: 'authentication', weight: 15 },
      { word: 'login', weight: 10 },
      { word: 'cas', weight: 16 },
      { word: 'cookie', weight: 10 },
      { word: 'jwt', weight: 10 },
    ],
    generateResponse: (): BotResponse => {
      const p = portfolioKnowledge.projects.find((item) => item.id === '3');
      const links =
        p?.links.github?.map((gh) => ({
          label: `GitHub: ${gh.label}`,
          url: gh.url,
          isExternal: true,
        })) || [];

      return {
        text: `**${p?.title || 'Centralized Authentication System (SSO)'}**\n\n• Built a CAS protocol–based Single Sign-On system with Spring Boot, JWT cookies, and Dockerized deployment.\n• Created a React + Redux frontend with lazy loading, role-based routing, and multi-app token handling.\n• Reduced redundant logins across tools by ~80%, streamlining access control across applications.`,
        links,
        tags: ['Java', 'Spring Boot', 'PostgreSQL', 'JWT', 'Cookies', 'SSO Auth', 'Docker'],
        suggestions: [
          'Customer Account Tracker project',
          'DevSpace Platform',
          'Work experience',
        ],
      };
    },
  },

  // 14. Specific Project: DevSpace Platform
  {
    id: 'project_devspace',
    name: 'DevSpace Platform',
    phrases: [
      'devspace',
      'article platform',
      'blog platform',
      'devspace platform',
    ],
    patterns: [/devspace/i],
    keywords: [
      { word: 'devspace', weight: 20 },
      { word: 'stream', weight: 10 },
      { word: 'collaboration', weight: 10 },
    ],
    generateResponse: (): BotResponse => {
      const p = portfolioKnowledge.projects.find((item) => item.id === '4');
      const links = [
        ...(p?.links.app
          ? [
              {
                label: 'Live Stream Articles',
                url: p.links.app,
                isExternal: false,
              },
            ]
          : []),
        ...(p?.links.github?.map((gh) => ({
          label: `GitHub: ${gh.label}`,
          url: gh.url,
          isExternal: true,
        })) || []),
      ];

      return {
        text: `**${p?.title || 'DevSpace Platform'}**\n\n• Comprehensive platform for creative developer collaboration, project management, and tech article sharing.\n• Built with modern React and TypeScript, deployed seamlessly on Cloudflare Pages.`,
        links,
        tags: ['React', 'TypeScript', 'Cloudflare Pages', 'Social Logins'],
        suggestions: [
          'Stream articles',
          'Biomedical Lab Tool project',
          'All projects',
        ],
      };
    },
  },

  // 15. Specific Project: Customer Account Tracker
  {
    id: 'project_customer_tracker',
    name: 'Customer Account Tracker',
    phrases: [
      'customer account tracker',
      'account tracker',
      'banking app',
      'fund transfer project',
    ],
    patterns: [/customer account/i, /account tracker/i, /fund transfer/i],
    keywords: [
      { word: 'tracker', weight: 14 },
      { word: 'customer', weight: 14 },
      { word: 'banking', weight: 14 },
      { word: 'fund', weight: 12 },
      { word: 'transfer', weight: 12 },
    ],
    generateResponse: (): BotResponse => {
      const p = portfolioKnowledge.projects.find((item) => item.id === '6');
      const links =
        p?.links.github?.map((gh) => ({
          label: `GitHub: ${gh.label}`,
          url: gh.url,
          isExternal: true,
        })) || [];

      return {
        text: `**${p?.title || 'Customer Account Tracker'}**\n\n• Built a production-ready CRUD + fund transfer system with Spring Boot, enhancing transactional accuracy.\n• Developed a responsive React UI with Redux, boosting navigation efficiency by ~20%.`,
        links,
        tags: ['Spring Boot', 'React', 'Redux', 'MySQL', 'PostgreSQL'],
        suggestions: [
          'Audaz Learning experience',
          'SSO Platform project',
          'All projects',
        ],
      };
    },
  },

  // 16. Experience - All / Overview
  {
    id: 'experience_all',
    name: 'Work Experience Overview',
    phrases: [
      'where have you worked',
      'work experience',
      'tell me about your experience',
      'companies you worked for',
      'career history',
      'employment history',
    ],
    patterns: [/where have you worked/i, /work experience/i, /employment history/i],
    keywords: [
      { word: 'experience', weight: 18 },
      { word: 'companies', weight: 14 },
      { word: 'company', weight: 12 },
      { word: 'career', weight: 12 },
      { word: 'history', weight: 10 },
      { word: 'employment', weight: 12 },
    ],
    negativeKeywords: ['project', 'projects', 'contact'],
    generateResponse: (): BotResponse => {
      const expList = portfolioKnowledge.experiences
        .map(
          (e) =>
            `• **${e.role}** at **${e.company}**\n  _${e.period} | ${e.location}_\n  ${e.highlights[0]}`
        )
        .join('\n\n');

      return {
        text: `Here is a summary of Madhusudan's professional work history:\n\n${expList}`,
        tags: ['Excelsoft Technologies', 'Audaz Learning', 'Full-stack', 'Spring Boot'],
        suggestions: [
          'Excelsoft Technologies role',
          'Audaz Learning internship',
          'Key technical skills',
        ],
      };
    },
  },

  // 17. Experience - Excelsoft Technologies
  {
    id: 'experience_excelsoft',
    name: 'Excelsoft Technologies Experience',
    phrases: [
      'excelsoft',
      'excelsoft technologies',
      'what did you do at excelsoft',
      'associate software engineer',
    ],
    patterns: [/excelsoft/i],
    keywords: [
      { word: 'excelsoft', weight: 20 },
      { word: 'technologies', weight: 8 },
      { word: 'mysore', weight: 10 },
    ],
    generateResponse: (): BotResponse => ({
      text: `**Excelsoft Technologies Ltd. (Mysore, India)**\n\n1. **Associate Software Engineer (Full-stack)** | Feb 2025 – Present\n   • Developed PhysioEx biomedical simulation platform with React DnD, Java Spring Boot, and PostgreSQL.\n   • Delivered full-scale diet/activity analysis SPA (React 18, TypeScript, Redux Toolkit, MUI, i18n).\n   • Containerized applications with Docker + Nginx and integrated AWS S3 with JWT auth.\n\n2. **Trainee Software Engineer (Frontend)** | Feb 2024 – Feb 2025\n   • Built scalable .NET (C#) application replicating Office 365 features.\n   • Streamlined task workflows with Amazon S3 and interactive JavaScript/jQuery UI components.`,
      tags: ['Excelsoft', 'Full-stack', 'React', 'Spring Boot', '.NET', 'AWS S3'],
      suggestions: [
        'Biomedical Lab Tool project',
        'Audaz Learning experience',
        'Technical skills',
      ],
    }),
  },

  // 18. Experience - Audaz Learning
  {
    id: 'experience_audaz',
    name: 'Audaz Learning Experience',
    phrases: ['audaz', 'audaz learning', 'internship', 'intern experience'],
    patterns: [/audaz/i, /internship/i],
    keywords: [
      { word: 'audaz', weight: 20 },
      { word: 'intern', weight: 14 },
      { word: 'internship', weight: 16 },
      { word: 'bengaluru', weight: 8 },
    ],
    generateResponse: (): BotResponse => ({
      text: `**Audaz Learning (Bengaluru, India)**\n_Internship Trainee (Backend) | Aug 2023 – Sep 2023_\n\n• Developed a RESTful Spring Boot backend for customer account management, supporting CRUD operations, fund transfers, and balance inquiries.\n• Created a responsive React frontend with Redux for smooth client navigation and state management.`,
      tags: ['Audaz Learning', 'Spring Boot', 'React', 'REST APIs', 'Internship'],
      suggestions: [
        'Customer Account Tracker project',
        'Excelsoft Technologies role',
        'Technical skills',
      ],
    }),
  },

  // 19. Articles & Stream
  {
    id: 'articles_stream',
    name: 'Articles & Insights',
    phrases: [
      'articles',
      'blog posts',
      'what articles have you written',
      'stream',
      'writings',
      'system architecture articles',
    ],
    patterns: [/articles/i, /blog/i, /stream/i, /writings/i],
    keywords: [
      { word: 'articles', weight: 18 },
      { word: 'article', weight: 18 },
      { word: 'blog', weight: 18 },
      { word: 'stream', weight: 16 },
      { word: 'insights', weight: 12 },
      { word: 'posts', weight: 12 },
      { word: 'written', weight: 10 },
    ],
    generateResponse: (): BotResponse => {
      const articleList = portfolioKnowledge.articles
        .map(
          (a) =>
            `• **${a.title}** (${a.badge || 'Technical'}, ${a.date})\n  ${a.description}`
        )
        .join('\n\n');

      return {
        text: `Madhusudan writes practical deep-dives on system architecture, backend security, and AI-assisted workflows:\n\n${articleList}`,
        links: [
          {
            label: 'Read All Articles on Stream',
            url: '/stream',
            isExternal: false,
          },
        ],
        suggestions: [
          'System architecture article',
          'JWT HttpOnly security article',
          'Featured projects',
        ],
      };
    },
  },

  // 20. Education
  {
    id: 'education',
    name: 'Education & Academics',
    phrases: [
      'education',
      'what is your degree',
      'where did you study',
      'college',
      'university',
      'academics',
    ],
    patterns: [/education/i, /degree/i, /college/i, /university/i, /academics/i],
    keywords: [
      { word: 'education', weight: 18 },
      { word: 'degree', weight: 16 },
      { word: 'college', weight: 16 },
      { word: 'university', weight: 16 },
      { word: 'study', weight: 12 },
      { word: 'studied', weight: 12 },
      { word: 'academics', weight: 14 },
    ],
    generateResponse: (): BotResponse => ({
      text: `**Educational Background:**\n\n• **${portfolioKnowledge.education.degree}**\n  _${portfolioKnowledge.education.note}_\n\nFocused on Computer Science fundamentals, Software Engineering, Database Systems, Data Structures & Algorithms, and Distributed Architectures.`,
      tags: ['Computer Science', 'Software Engineering'],
      suggestions: [
        'Work experience',
        'Key technical skills',
        'Contact details',
      ],
    }),
  },

  // 21. Certifications & Achievements
  {
    id: 'certifications_achievements',
    name: 'Certifications & Achievements',
    phrases: [
      'certifications',
      'certificates',
      'achievements',
      'accomplishments',
      'milestones',
    ],
    patterns: [/certif/i, /achievement/i, /accomplish/i],
    keywords: [
      { word: 'certifications', weight: 18 },
      { word: 'certificates', weight: 18 },
      { word: 'achievements', weight: 18 },
      { word: 'accomplishments', weight: 16 },
      { word: 'milestones', weight: 14 },
    ],
    generateResponse: (): BotResponse => {
      const achievementsList = portfolioKnowledge.achievements
        .map((a) => `• ${a}`)
        .join('\n');

      return {
        text: `**Key Achievements & Certifications:**\n\n${achievementsList}\n\n_${portfolioKnowledge.certifications.summary}_`,
        tags: ['Performance Optimization', 'Enterprise SSO', 'Architecture'],
        suggestions: [
          'Tell me about your projects',
          'Work experience',
          'Contact details',
        ],
      };
    },
  },

  // 22. Contact & Socials
  {
    id: 'contact',
    name: 'Contact & Hire',
    phrases: [
      'how to contact you',
      'contact',
      'email',
      'reach you',
      'get in touch',
      'hire you',
      'connect',
      'linkedin',
      'github',
    ],
    patterns: [/contact/i, /email/i, /how (to|can i) (reach|contact|hire)/i],
    keywords: [
      { word: 'contact', weight: 18 },
      { word: 'email', weight: 18 },
      { word: 'reach', weight: 14 },
      { word: 'touch', weight: 12 },
      { word: 'hire', weight: 16 },
      { word: 'connect', weight: 12 },
      { word: 'linkedin', weight: 14 },
      { word: 'github', weight: 14 },
      { word: 'message', weight: 10 },
    ],
    generateResponse: (): BotResponse => ({
      text: `You can connect with Madhusudan directly via the following channels:\n\n• **Email**: [${portfolioKnowledge.owner.email}](mailto:${portfolioKnowledge.owner.email})\n• **LinkedIn**: [linkedin.com/in/madhusudan-k-s](${portfolioKnowledge.owner.linkedin})\n• **GitHub**: [github.com/madhusudan-ks](${portfolioKnowledge.owner.github})\n• **Portfolio**: [${portfolioKnowledge.owner.portfolioUrl}](${portfolioKnowledge.owner.portfolioUrl})`,
      links: [
        {
          label: 'Send Email',
          url: `mailto:${portfolioKnowledge.owner.email}`,
          isExternal: true,
        },
        {
          label: 'Open LinkedIn',
          url: portfolioKnowledge.owner.linkedin,
          isExternal: true,
        },
        {
          label: 'Open GitHub',
          url: portfolioKnowledge.owner.github,
          isExternal: true,
        },
      ],
      suggestions: [
        'Request résumé',
        'Tell me about yourself',
        'Featured projects',
      ],
    }),
  },

  // 23. Resume / CV
  {
    id: 'resume',
    name: 'Résumé & CV',
    phrases: [
      'resume',
      'cv',
      'download resume',
      'where is your resume',
      'send me your resume',
    ],
    patterns: [/r[eé]sum[eé]/i, /\bcv\b/i],
    keywords: [
      { word: 'resume', weight: 20 },
      { word: 'cv', weight: 20 },
      { word: 'download', weight: 10 },
    ],
    generateResponse: (): BotResponse => ({
      text: `**Résumé Request:**\n\n${portfolioKnowledge.owner.resumeNote}\n\nYou can also explore his complete verified career timeline and projects right here on the portfolio!`,
      links: [
        {
          label: 'Email Madhusudan',
          url: `mailto:${portfolioKnowledge.owner.email}?subject=Resume%20Request`,
          isExternal: true,
        },
        {
          label: 'Connect on LinkedIn',
          url: portfolioKnowledge.owner.linkedin,
          isExternal: true,
        },
        {
          label: 'View Work Experience Page',
          url: '/experience',
          isExternal: false,
        },
      ],
      suggestions: [
        'Work experience overview',
        'Key technical skills',
        'How can I contact you?',
      ],
    }),
  },

  // 24. Out of scope / AI claim clarification
  {
    id: 'general_ai_redirect',
    name: 'Out of Scope / AI Clarification',
    phrases: [
      'who is president',
      'write a poem',
      'weather today',
      'solve this math problem',
      'tell me a joke',
      'are you chatgpt',
      'are you open ai',
    ],
    patterns: [
      /are you (chatgpt|ai|an llm|claude|gemini)/i,
      /write a (poem|song|story)/i,
    ],
    keywords: [
      { word: 'chatgpt', weight: 15 },
      { word: 'poem', weight: 15 },
      { word: 'joke', weight: 15 },
      { word: 'weather', weight: 15 },
    ],
    generateResponse: (): BotResponse => ({
      text: `I'm a dedicated, zero-cost portfolio engine designed specifically for Madhusudan's portfolio! Unlike general-purpose AI bots, I specialize exclusively in factual, verified details about Madhusudan's software engineering background, skills, projects, and contact info.\n\nPlease feel free to ask about any aspect of his professional portfolio!`,
      suggestions: [
        'Tell me about Madhusudan',
        'What is your tech stack?',
        'Show me your projects',
        'How can I reach you?',
      ],
    }),
  },
];

/**
 * Deterministic intent matcher scoring system.
 * Returns the best matching intent or a structured fallback.
 */
export function matchQuestion(query: string): IntentMatchResult {
  const normalized = normalizeText(query);

  if (!normalized) {
    return {
      intentId: 'empty',
      score: 0,
      matchedKeywords: [],
      response: {
        text: 'Please type a question about Madhusudan’s skills, projects, experience, or contact information.',
        suggestions: [
          'What is your tech stack?',
          'Show me your projects',
          'Where have you worked?',
          'Contact info',
        ],
      },
    };
  }

  const tokens = expandTokens(normalized);
  const tokenSet = new Set(tokens);

  let bestIntent: IntentDefinition | null = null;
  let bestScore = 0;
  let bestMatchedWords: string[] = [];

  for (const intent of INTENTS) {
    let score = 0;
    const matchedWords: string[] = [];

    // Exact phrase match bonus
    if (intent.phrases) {
      for (const phrase of intent.phrases) {
        const normPhrase = normalizeText(phrase);
        if (normalized === normPhrase) {
          score += 60;
          matchedWords.push(`[exact:"${phrase}"]`);
          break;
        } else if (normalized.includes(normPhrase) && normPhrase.length > 3) {
          score += 30;
          matchedWords.push(`[phrase:"${phrase}"]`);
        }
      }
    }

    // Pattern / regex match bonus
    if (intent.patterns) {
      for (const pattern of intent.patterns) {
        if (pattern.test(normalized)) {
          score += 40;
          matchedWords.push(`[regex:${pattern.source}]`);
          break;
        }
      }
    }

    // Keyword scoring: match tokens for single words or phrase search for multi-words
    for (const kw of intent.keywords) {
      const normKw = normalizeText(kw.word);
      const isMatch = normKw.includes(' ')
        ? normalized.includes(normKw)
        : tokenSet.has(normKw);

      if (isMatch) {
        score += kw.weight;
        matchedWords.push(normKw);
      }
    }

    // Negative keyword penalty
    if (intent.negativeKeywords) {
      for (const neg of intent.negativeKeywords) {
        const normNeg = normalizeText(neg);
        if (tokenSet.has(normNeg)) {
          score -= 25;
        }
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestIntent = intent;
      bestMatchedWords = matchedWords;
    }
  }

  // Minimum confidence threshold
  const CONFIDENCE_THRESHOLD = 14;

  if (bestIntent && bestScore >= CONFIDENCE_THRESHOLD) {
    return {
      intentId: bestIntent.id,
      score: bestScore,
      matchedKeywords: bestMatchedWords,
      response: bestIntent.generateResponse(query),
    };
  }

  // Low confidence / fallback
  return {
    intentId: 'fallback',
    score: bestScore,
    matchedKeywords: bestMatchedWords,
    response: {
      text: `I couldn't find a direct answer to that in Madhusudan's portfolio knowledge base.\n\nI specialize specifically in verified details about his:\n• **Technical Skills** (React, Spring Boot, Java, .NET, PostgreSQL, AWS)\n• **Projects** (Biomedical Lab Tool, Diet Analysis, SSO Auth, DevSpace)\n• **Work Experience** (Excelsoft Technologies & Audaz Learning)\n• **Articles & Contact Info**\n\nTry clicking one of the suggested topics below:`,
      suggestions: [
        'What is your tech stack?',
        'Tell me about your projects',
        'Where have you worked?',
        'How can I contact you?',
      ],
    },
  };
}
