// src/features/chatbot/types/chatbot.types.ts

export type MessageSender = 'user' | 'bot';

export interface ActionLink {
  label: string;
  url: string;
  isExternal?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  text: string;
  timestamp: string;
  links?: ActionLink[];
  tags?: string[];
  suggestions?: string[];
}

export interface BotResponse {
  text: string;
  links?: ActionLink[];
  tags?: string[];
  suggestions?: string[];
}

export interface IntentMatchResult {
  intentId: string;
  score: number;
  matchedKeywords: string[];
  response: BotResponse;
}

export interface IntentDefinition {
  id: string;
  name: string;
  keywords: Array<{ word: string; weight: number }>;
  patterns?: RegExp[];
  phrases?: string[];
  negativeKeywords?: string[];
  generateResponse: (query: string) => BotResponse;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface PortfolioKnowledge {
  owner: {
    name: string;
    titles: string[];
    summary: string;
    currentLocation: string;
    email: string;
    github: string;
    githubAlt: string;
    linkedin: string;
    portfolioUrl: string;
    resumeNote: string;
  };
  skillCategories: SkillCategory[];
  allSkills: string[];
  experiences: Array<{
    company: string;
    role: string;
    roleType: string;
    period: string;
    location: string;
    highlights: string[];
  }>;
  projects: Array<{
    id: string;
    title: string;
    status: string;
    techStack: string[];
    description: string[];
    links: {
      app?: string;
      github?: Array<{ label: string; url: string }>;
    };
  }>;
  articles: Array<{
    id: string;
    title: string;
    description: string;
    badge?: string;
    date: string;
    path: string;
  }>;
  education: {
    degree: string;
    note: string;
  };
  certifications: {
    summary: string;
    note: string;
  };
  achievements: string[];
}
