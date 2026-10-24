// src/features/chatbot/data/portfolioKnowledge.ts
import type { PortfolioKnowledge } from '../types/chatbot.types.ts';

export const portfolioKnowledge: PortfolioKnowledge = {
  owner: {
    name: 'Madhusudan K S',
    titles: [
      'Full-Stack Engineer',
      'Software Engineer',
      'Frontend & Backend Developer',
    ],
    summary:
      'Full-Stack Software Engineer with 2+ years of professional experience specializing in React, TypeScript, Java, Spring Boot, .NET Core, and PostgreSQL. Experienced in building high-performance SPAs, drag-and-drop simulations, enterprise SSO solutions, and RESTful microservices.',
    currentLocation: 'Mysore & Bengaluru, India',
    email: 'madhusudan.ks.work@gmail.com',
    github: 'https://github.com/madhusudan-ks',
    githubAlt: 'https://github.com/Madhusudan1712',
    linkedin: 'https://www.linkedin.com/in/madhusudan-k-s',
    portfolioUrl: 'https://madhusudan-ks.pages.dev',
    resumeNote:
      'My full résumé is available upon request. Please connect with me via email (madhusudan.ks.work@gmail.com) or LinkedIn.',
  },

  skillCategories: [
    {
      category: 'Frontend',
      skills: [
        'React (18 & 19)',
        'TypeScript',
        'JavaScript (ES6+)',
        'Redux Toolkit',
        'Material UI (MUI)',
        'GSAP Animations',
        'HTML5',
        'CSS3 & SCSS/Sass',
        'React Router v7',
        'Vite',
        'Drag & Drop (DnD)',
        'Bootstrap',
        'jQuery',
      ],
    },
    {
      category: 'Backend & APIs',
      skills: [
        'Java',
        'Spring Boot',
        '.NET Core & C#',
        'Node.js',
        'RESTful APIs',
        'JWT Authentication',
        'HttpOnly Cookie Auth',
        'Role-Based Access Control (RBAC)',
      ],
    },
    {
      category: 'Databases',
      skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
    },
    {
      category: 'Cloud, DevOps & Hosting',
      skills: [
        'AWS S3',
        'AWS EC2',
        'Docker',
        'Kubernetes',
        'Nginx',
        'Cloudflare Pages',
        'Git & GitHub',
      ],
    },
    {
      category: 'Architecture & System Design',
      skills: [
        'Microservices Architecture',
        'Single Sign-On (SSO / CAS Protocol)',
        'Scalable System Design',
        'API Gateway & Load Balancing',
      ],
    },
    {
      category: 'Testing & Tools',
      skills: [
        'Jest',
        'SonarQube',
        'Swagger / OpenAPI',
        'Postman',
        'VS Code',
        'IntelliJ IDEA',
        'Visual Studio',
        'STS',
      ],
    },
  ],

  allSkills: [
    'React',
    'TypeScript',
    'JavaScript',
    'Java',
    'Spring Boot',
    '.NET Core',
    'C#',
    'Node.js',
    'Redux',
    'Redux Toolkit',
    'Material UI',
    'MUI',
    'GSAP',
    'PostgreSQL',
    'MySQL',
    'MongoDB',
    'Redis',
    'AWS',
    'AWS S3',
    'AWS EC2',
    'Docker',
    'Kubernetes',
    'Nginx',
    'Git',
    'GitHub',
    'REST APIs',
    'JWT',
    'SSO',
    'Vite',
    'Cloudflare Pages',
  ],

  experiences: [
    {
      company: 'Excelsoft Technologies Ltd.',
      role: 'Associate Software Engineer',
      roleType: 'Full-stack',
      period: 'Feb 2025 - Present',
      location: 'Mysore, India',
      highlights: [
        'Developing an advanced React-based biomedical learning platform (PhysioEx) with interactive draggable UI components (DnD library), experiment simulations, viva MCQs, and real-time result tracking.',
        'Integrating a Java Spring Boot backend with PostgreSQL and Amazon S3 with RBAC and instant result notifications.',
        'Built full-scale React 18 + TypeScript SPA for diet/activity analysis with Vite, Redux Toolkit, MUI, and multilingual support.',
        'Containerized deployment using Docker + Nginx, JWT auth, Chart.js/Recharts, and automated Excel/PDF exports.',
      ],
    },
    {
      company: 'Excelsoft Technologies Ltd.',
      role: 'Trainee Software Engineer',
      roleType: 'Frontend',
      period: 'Feb 2024 - Feb 2025',
      location: 'Mysore, India',
      highlights: [
        'Developed a scalable .NET (C#) application replicating essential Office 365 features, managing task data in Amazon S3.',
        'Built interactive event-driven interfaces with JavaScript and jQuery, enabling multi-access keyboard and mouse navigation.',
        'Contributed to the SIM5 app-link platform by integrating reusable components and optimizing AWS service communication.',
      ],
    },
    {
      company: 'Audaz Learning',
      role: 'Internship Trainee',
      roleType: 'Backend',
      period: 'Aug 2023 - Sep 2023',
      location: 'Bengaluru, India',
      highlights: [
        'Developed a RESTful Spring Boot backend for customer account management (CRUD, fund transfers, balance checks).',
        'Built a responsive React frontend with Redux and React Router for seamless navigation and state management.',
      ],
    },
  ],

  projects: [
    {
      id: '1',
      title: 'Interactive Biomedical Lab Tool (PhysioEx)',
      status: 'dev',
      techStack: [
        'React',
        'TypeScript',
        'Redux',
        'DnD',
        'Node.js',
        'PostgreSQL',
        'AWS',
        'GSAP Animation',
      ],
      description: [
        'Built advanced draggable, interactive React UI components improving student task completion by ~35%.',
        'Integrated Spring Boot backend with PostgreSQL, Amazon S3, and role-based access control.',
        'Implemented real-time result tracking and instructor notifications, reducing review overhead by ~40%.',
      ],
      links: {
        app: 'https://www.pearson.com/en-us/subject-catalog/p/physioex-100-laboratory-simulations-in-physiology/P200000010623/9780136447658?srsltid=AfmBOoqS_PLNovh_mN59chHWwdowV33IBjRTlzXvPBS9ZCtGXWjTuWQZ',
      },
    },
    {
      id: '2',
      title: 'Nutrition & Activity Tracking App (My Diet Analysis)',
      status: 'prod',
      techStack: [
        'React 18',
        'TypeScript',
        'Redux Toolkit',
        'MUI',
        'Java',
        'Spring Boot',
        'PostgreSQL',
        'AWS',
      ],
      description: [
        'Delivered a modern React 18 + TypeScript SPA using Vite, Redux Toolkit, MUI, and React Router v7.',
        'Integrated enterprise SSO (piSession/IES) with fully protected routes and token-based interceptors.',
        'Added charts, analytics dashboards, and ExcelJS/PDF print exports, cutting report generation effort by ~60%.',
        'Improved frontend performance by ~25% using memoization, lazy loading, and optimized API batching.',
      ],
      links: {
        app: 'https://www.pearson.com/en-us/higher-education/products-services/mydietanalysis.html?srsltid=AfmBOorEfde9hRQjOEmNlqTd1x1266Chacv2WKD8Ea_7VqV_mrKFPTO9',
      },
    },
    {
      id: '3',
      title: 'Centralized Authentication System (SSO Platform)',
      status: 'prod',
      techStack: [
        'Java',
        'Spring Boot',
        'PostgreSQL',
        'JWT',
        'Cookies',
        'SSO Auth',
        'Docker',
      ],
      description: [
        'Built a CAS protocol–based SSO system using Spring Boot, JWT cookie, and Dockerized deployment.',
        'Created a React + Redux frontend with lazy loading, role-based routing, and multi-app token handling.',
        'Reduced redundant logins across tools by ~80%, simplifying user onboarding and access control.',
      ],
      links: {
        github: [
          {
            label: 'Frontend',
            url: 'https://github.com/Madhusudan1712/auth-frontend',
          },
          {
            label: 'Backend',
            url: 'https://github.com/Madhusudan1712/auth-backend',
          },
        ],
      },
    },
    {
      id: '4',
      title: 'DevSpace Platform',
      status: 'prod',
      techStack: ['React', 'TypeScript', 'Social Logins', 'Cloudflare Pages'],
      description: [
        'Comprehensive platform for creative collaboration, project management, and developer insights.',
        'Collaborative article writing and tech blog sharing platform.',
      ],
      links: {
        app: 'https://dev.madhusudan.space/stream',
        github: [
          {
            label: 'Frontend',
            url: 'https://github.com/Madhusudan1712/devspace-frontend',
          },
        ],
      },
    },
    {
      id: '5',
      title: 'Office Suite Alternative',
      status: 'prod',
      techStack: [
        'C#',
        '.NET MVC',
        'JavaScript',
        'jQuery',
        'Amazon S3',
        'PostgreSQL',
      ],
      description: [
        'Developed key Office 365-style features using C#, .NET MVC, JavaScript, and jQuery.',
        'Added multi-device accessibility and event-driven actions, improving interaction responsiveness by ~30%.',
        'Migrated document workflows to Amazon S3, improving reliability and reducing file retrieval latency.',
      ],
      links: {
        app: 'https://www.pearson.com/en-us/higher-education/products-services/mylab/it.html?srsltid=AfmBOoqxv5KxTPg1hvHXtM4mU8OGd1zBn9xDrQiskUG1z9xFHHm71eQf',
      },
    },
    {
      id: '6',
      title: 'Customer Account Tracker',
      status: 'local',
      techStack: ['Spring Boot', 'React', 'Redux', 'PostgreSQL', 'MySQL'],
      description: [
        'Built a production-ready CRUD + fund transfer system with Spring Boot, enhancing transactional accuracy.',
        'Developed responsive React UI with Redux, improving navigation efficiency by ~20%.',
      ],
      links: {
        github: [
          {
            label: 'Backend',
            url: 'https://github.com/Madhusudan1712/CustomerAccountTracker',
          },
        ],
      },
    },
  ],

  articles: [
    {
      id: '1',
      title: 'Plan First, Code Later: System Architecture with AI',
      description:
        'Blueprint your logic and let AI handle the boilerplate. System architecture design is your foundational blueprint defining system structure and behavior before coding.',
      badge: 'Architecture',
      date: 'Jun 2026',
      path: '/stream',
    },
    {
      id: '2',
      title: 'Proxy vs Reverse Proxy vs Load Balancer vs API Gateway',
      description:
        'Understand how proxies, reverse proxies, load balancers, and API gateways work together in modern backend architectures. Each layer has a clear responsibility.',
      badge: 'System Design',
      date: 'Dec 2025',
      path: '/stream',
    },
    {
      id: '3',
      title:
        'Stop Storing JWTs in localStorage: Use HttpOnly Cookies for Secure Authentication',
      description:
        'JWT authentication is great for stateless apps, but only if stored securely. Stop relying on localStorage and switch to HttpOnly cookies to protect against XSS vulnerabilities.',
      badge: 'Security',
      date: 'Aug 2025',
      path: '/stream',
    },
    {
      id: '4',
      title:
        'AI Prompting for Developers: Mastering the Art of Asking Better Questions',
      description:
        'You don’t need to prompt like a prompt engineer. Treat the AI like a helpful teammate—give context, be clear, and collaborate iteratively to code smarter.',
      badge: 'AI & Dev',
      date: 'May 2025',
      path: '/stream',
    },
  ],

  education: {
    degree: 'Bachelor of Engineering in Computer Science & Engineering',
    note: '[Verified Placeholder: Technical degree in Computer Science / Engineering. Update specific institution name and graduation year in portfolioKnowledge.ts if desired]',
  },

  certifications: {
    summary:
      'Continuous learner in Modern Web Architectures, Advanced Spring Security, and Cloud Computing (AWS S3 & Cloudflare).',
    note: '[Verified Placeholder: Available upon request. Update specific credentials in portfolioKnowledge.ts if desired]',
  },

  achievements: [
    'Engineered interactive biomedical lab simulation platform (PhysioEx) improving task completion by ~35%.',
    'Built enterprise SSO (CAS protocol) reducing redundant logins by ~80% across tools.',
    'Optimized SPA frontend performance by ~25% through memoization, lazy loading, and query batching.',
    'Cut report generation and export overhead by ~60% using automated PDF and Excel workflows.',
    'Authored technical deep-dives on system architecture, reverse proxies, and HttpOnly auth security.',
  ],
};
