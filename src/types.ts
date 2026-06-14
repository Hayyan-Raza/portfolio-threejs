export interface Specialization {
  title: string;
  icon: string;
  description: string;
}

export interface SkillCategory {
  name: string;
  skills: { name: string; level: number }[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  details: string;
  tech: string[];
  category: "AI & Automation" | "Web & Cloud" | "Game Dev" | "All";
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
}

export interface ExperienceEvent {
  year: string;
  role: string;
  company: string;
  description: string;
  achievements: string[];
}

export interface Service {
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface Stat {
  label: string;
  value: string;
  sub: string;
}

export interface TimelineNode {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  description: string;
  icon: string;
}
