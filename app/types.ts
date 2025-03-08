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
}
