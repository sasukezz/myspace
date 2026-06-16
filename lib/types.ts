export type LinkItem = {
  label: string;
  href: string;
};

export type Question = {
  id: string;
  title: string;
  subtitle: string;
  why: string;
  status: string;
  articles: LinkItem[];
  experiments: string[];
};

export type Experiment = {
  id: string;
  name: string;
  image: string;
  link?: LinkItem;
  question: string;
  hypothesis: string;
  experiment: string;
  finding: string[];
  next: string;
};

export type SystemNode = {
  id: string;
  name: string;
  label: string;
  link?: LinkItem;
  description: string;
  image?: string;
  details: string[];
};

export type LibraryItem = {
  type: string;
  title: string;
  description: string;
  status: string;
};

export type Note = {
  id: string;
  year: string;
  title: string;
  source: string;
  href: string;
  tags: string[];
};

export type ExperienceItem = {
  company: string;
  href: string;
  focus: string;
  description: string;
};

export type ContactItem = {
  label: string;
  href: string;
};
