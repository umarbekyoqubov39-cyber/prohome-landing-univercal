export type Locale = "uz" | "ru" | "en";

export interface NavLink {
  label: string;
  href: string;
}

export interface ProblemCard {
  icon: string;
  title: string;
  description: string;
}

export interface ConsequenceItem {
  text: string;
}

export interface PlatformModule {
  icon: string;
  badge: string;
  title: string;
  points: string[];
}

export interface ProcessStep {
  number: string;
  text: string;
}

export interface DashboardMetric {
  icon: string;
  value: string;
  label: string;
  delta: string;
  accent: "blue" | "green" | "purple" | "teal";
}

export interface ContactFormValues {
  name: string;
  phone: string;
  company: string;
  /** Honeypot field: bots fill it, real users never see it. */
  website: string;
}

export interface ContactFormResult {
  success: boolean;
  message: string;
}
