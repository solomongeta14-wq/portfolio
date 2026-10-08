/**
 * PROJECT PLACEHOLDERS — replace with your real projects.
 *
 * Each entry supports: title, description, longDescription, problem,
 * solution, features, challenges, technologies, image, github, demo,
 * category and featured.
 *
 * Set `github` / `demo` to a real URL (or "#" to hide the button),
 * and point `image` at a file in /public/projects/.
 */

export type ProjectCategory = "Full Stack" | "Frontend" | "Backend";

export type Project = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  problem?: string;
  solution?: string;
  features?: string[];
  challenges?: string[];
  technologies: string[];
  image: string;
  github: string;
  demo: string;
  category: ProjectCategory;
  featured: boolean;
};

export const projectCategories = ["All", "Frontend", "Backend", "Full Stack"] as const;

export const projects: Project[] = [
  {
    id: "project-placeholder-1",
    title: "PROJECT_PLACEHOLDER_1",
    description:
      "[ADD PROJECT HERE] Replace this with a short, one-or-two sentence summary of your project.",
    longDescription:
      "[ADD LONG DESCRIPTION HERE] Explain what the project does, who it is for, and what technology choices you made.",
    problem: "[ADD THE PROBLEM THIS PROJECT SOLVES HERE]",
    solution: "[ADD YOUR SOLUTION APPROACH HERE]",
    features: [
      "[ADD FEATURE HERE]",
      "[ADD FEATURE HERE]",
      "[ADD FEATURE HERE]",
    ],
    challenges: ["[ADD CHALLENGE HERE]"],
    technologies: ["React", "Node.js", "Supabase"],
    image: "/projects/project-1.svg",
    github: "#", // [ADD LINK HERE]
    demo: "#", // [ADD LINK HERE]
    category: "Full Stack",
    featured: true,
  },
  {
    id: "project-placeholder-2",
    title: "PROJECT_PLACEHOLDER_2",
    description:
      "[ADD PROJECT HERE] Replace this with a short, one-or-two sentence summary of your project.",
    longDescription:
      "[ADD LONG DESCRIPTION HERE] Explain what the project does, who it is for, and what technology choices you made.",
    problem: "[ADD THE PROBLEM THIS PROJECT SOLVES HERE]",
    solution: "[ADD YOUR SOLUTION APPROACH HERE]",
    features: ["[ADD FEATURE HERE]", "[ADD FEATURE HERE]"],
    challenges: ["[ADD CHALLENGE HERE]"],
    technologies: ["React", "CSS", "JavaScript"],
    image: "/projects/project-2.svg",
    github: "#", // [ADD LINK HERE]
    demo: "#", // [ADD LINK HERE]
    category: "Frontend",
    featured: false,
  },
  {
    id: "project-placeholder-3",
    title: "PROJECT_PLACEHOLDER_3",
    description:
      "[ADD PROJECT HERE] Replace this with a short, one-or-two sentence summary of your project.",
    longDescription:
      "[ADD LONG DESCRIPTION HERE] Explain what the project does, who it is for, and what technology choices you made.",
    problem: "[ADD THE PROBLEM THIS PROJECT SOLVES HERE]",
    solution: "[ADD YOUR SOLUTION APPROACH HERE]",
    features: ["[ADD FEATURE HERE]", "[ADD FEATURE HERE]"],
    challenges: ["[ADD CHALLENGE HERE]"],
    technologies: ["Node.js", "Express.js", "Supabase"],
    image: "/projects/project-3.svg",
    github: "#", // [ADD LINK HERE]
    demo: "#", // [ADD LINK HERE]
    category: "Backend",
    featured: false,
  },
];
