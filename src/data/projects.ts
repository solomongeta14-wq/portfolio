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
    id: "income-calculator",
    title: "Income Calculator",
    description:
      "A calculator that helps users track earnings and quickly work out their income.",
    longDescription:
      "Income Calculator is a personal project that lets users enter their income details and instantly see calculated results. It focuses on a clean, easy-to-use interface for everyday money tracking.",
    problem: "Manually working out income and totals is slow and error-prone.",
    solution:
      "A lightweight calculator that takes the user's inputs and produces clear, accurate income figures instantly.",
    features: [
      "Enter and calculate income",
      "Instant, accurate results",
      "Clean, responsive interface",
    ],
    challenges: ["Keeping calculations accurate while the UI stays simple."],
    technologies: ["JavaScript", "HTML", "CSS"],
    image: "/projects/income-calculator.png",
    github: "https://github.com/solomongeta14-wq/income-calculator",
    demo: "https://income-calculator-seven.vercel.app",
    category: "Frontend",
    featured: true,
  },
  {
    id: "queue-system",
    title: "Queue System",
    description:
      "A system for managing and organizing queues, giving users a clear view of their place in line.",
    longDescription:
      "Queue System is a personal project built to manage queues digitally. It organizes waiting entries and gives a clear overview of the queue so service can move in an orderly way.",
    problem: "Physical queues are disorganized and hard to manage fairly.",
    solution:
      "A digital queue manager that tracks entries and presents the queue in a clear, organized view.",
    features: [
      "Add and manage queue entries",
      "Clear view of the current queue",
      "Orderly, fair processing",
    ],
    challenges: ["Designing an interface that stays clear as the queue grows."],
    technologies: ["JavaScript", "HTML", "CSS"],
    image: "/images/queu-system-image.jpg",
    github: "https://github.com/solomongeta14-wq/Queu-System",
    demo: "#",
    category: "Full Stack",
    featured: false,
  },
  {
    id: "edir-management",
    title: "Edir Management",
    description:
      "A registration page for managing an Edir, a traditional community savings association.",
    longDescription:
      "Edir Management provides a registration page for an Edir, the traditional community association. It handles member registration and keeps the association's records organized in one place.",
    problem: "Edir records are often kept manually, making them hard to manage.",
    solution:
      "A registration page that digitizes member sign-up and keeps association records organized.",
    features: [
      "Member registration form",
      "Organized member records",
      "Simple, accessible interface",
    ],
    challenges: ["Designing a form that is simple for all community members to use."],
    technologies: ["JavaScript", "HTML", "CSS"],
    image: "/images/edir-management-system.jpg",
    github: "https://github.com/solomongeta14-wq/updated-edir-registration-page",
    demo: "#",
    category: "Frontend",
    featured: false,
  },
];
