export interface Label {
  id: number;
  name: string;
  color: string;
}

export interface User {
  login: string;
  avatar_url: string;
}

export interface Issue {
  id: number;
  number: number;
  title: string;
  html_url: string;
  user: User;
  labels: Label[];
  state: string;
  created_at: string;
  body: string;
  categories?: LabelCategory[];
}

export type LabelCategory =
  | "all"
  | "frontend"
  | "backend"
  | "build"
  | "ci-cd"
  | "docs"
  | "bug"
  | "enhancement"
  | "good first issue"
  | "help wanted"
  | "other";

export const labelCategories: Record<LabelCategory, string[]> = {
  all: [],
  frontend: [
    "frontend",
    "ui",
    "ux",
    "design",
    "css",
    "html",
    "javascript",
    "react",
    "vue",
    "angular",
  ],
  backend: [
    "backend",
    "api",
    "database",
    "server",
    "nodejs",
    "python",
    "java",
    "golang",
  ],
  build: ["build", "webpack", "vite", "bundler", "package"],
  "ci-cd": [
    "ci",
    "cd",
    "pipeline",
    "github-actions",
    "jenkins",
    "docker",
    "kubernetes",
  ],
  docs: ["documentation", "docs", "guide", "tutorial"],
  bug: ["bug", "error", "fix", "issue"],
  enhancement: ["enhancement", "feature", "improvement"],
  "good first issue": [
    "good first issue",
    "beginner friendly",
    "starter",
    "easy",
  ],
  "help wanted": ["help wanted", "help-wanted", "need help"],
  other: [],
};
