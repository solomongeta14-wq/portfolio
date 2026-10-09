/**
 * Central place for all personal information.
 * Edit this file to update the site — no component changes needed.
 */

export type SocialLink = {
  name: string;
  url: string;
  icon: "github" | "linkedin" | "email" | "phone";
};

export type EducationIcon = "book" | "graduation" | "university";

export type EducationEntry = {
  /** Milestone label, e.g. "Primary Education". */
  level: string;
  /** School or university name. */
  institution: string;
  /** Degree or qualification, when applicable (University). */
  degree?: string;
  /** Period in the Ethiopian Calendar (E.C.) where applicable. */
  period?: string;
  /** Grades or credential line, e.g. "Grades 1–8". */
  credential?: string;
  description?: string;
  /** Lighthearted one-liner shown on the card. */
  humor?: string;
  icon: EducationIcon;
};

export type ExperienceEntry = {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string[];
  responsibilities: string[];
};

export const portfolio = {
  name: "Solomon Geta",
  firstName: "Solomon",
  lastName: "Geta",
  initials: "SG",
  title: "Software Engineer & Full-Stack Developer",
  /** Roles cycled by the hero typewriter. */
  roles: [
    "Software Engineer",
    "Full-Stack Developer",
    "React Developer",
    "Node.js Developer",
  ],
  bio: "I am a dedicated software engineer with a strong focus on full-stack web development. I love turning complex problems into simple, elegant, and high-performance digital solutions. My core stack includes modern JavaScript, React, Node.js, and robust database systems. When I am not coding, I am exploring new technologies and optimizing user experiences.",
  shortBio:
    "I turn complex problems into simple, elegant, and high-performance digital solutions — with modern JavaScript, React, Node.js, and robust database systems.",
  location: "Dire Dawa, Ethiopia",
  email: "solomongeta14@gmail.com",
  phone: "+251935528932",
  github: "https://github.com/solomongeta14-wq",
  /** [PLACEHOLDER — ADD LINKEDIN URL HERE] */
  linkedin: null as string | null,
  /** Drop your CV at this path in /public — the UI degrades gracefully if missing. */
  resumePath: "/resume/solomon-geta-cv.pdf",
  /** Drop your photo at this path in /public — a monogram fallback shows if missing. */
  profileImage: "/images/profile-photo.jpg",
  /** Hero (orbiting) photo — drop a second image here to differ from the About portrait. */
  heroImage: "/images/Coder.jpg",
  education: [
    {
      level: "Primary Education",
      institution: "Wolaita Lika Primary School",
      period: "2003 – 2011 E.C.",
      credential: "Grades 1–8",
      description:
        "My educational journey began here, where I developed the foundational knowledge that prepared me for future learning.",
      humor:
        "Every expert starts as a beginner—even the people who debug code at 2 a.m.",
      icon: "book",
    },
    {
      level: "Secondary Education",
      institution: "Wolaita Lika High School",
      period: "2012 – 2015 E.C.",
      credential: "Grades 9–12",
      description:
        "I continued strengthening my academic knowledge, developing learning habits, and preparing for university life.",
      humor:
        "More subjects, bigger goals, and the occasional question: When will I ever use this?",
      icon: "graduation",
    },
    {
      level: "University Education",
      institution: "Dire Dawa University",
      degree: "BSc in Software Engineering",
      period: "Fourth-year · In progress",
      credential: "BSc in Software Engineering",
      description:
        "I am developing my software engineering knowledge and technical skills, learning to turn ideas into practical applications and solve real-world problems.",
      humor: "Current mission: turn curiosity, creativity, and code into something useful.",
      icon: "university",
    },
  ] as EducationEntry[],
  /** [ADD EXPERIENCE HERE] — currently empty on purpose; never invent roles. */
  experience: [] as ExperienceEntry[],
  focus: [
    "Full-Stack Development",
    "Web Development",
    "Software Engineering",
    "REST APIs",
    "Database Integration",
  ],
  stats: [
    { value: "Full-Stack", label: "Development Focus", accent: "lime" as const },
    { value: "B.Sc.", label: "Software Engineering", accent: "dim" as const },
    { value: "Dire Dawa", label: "Based In Ethiopia", accent: "gold" as const },
  ],
};

export const socialLinks: SocialLink[] = [
  { name: "GitHub", url: portfolio.github, icon: "github" },
  // [PLACEHOLDER — ADD LINKEDIN HERE]
  ...(portfolio.linkedin
    ? [{ name: "LinkedIn", url: portfolio.linkedin, icon: "linkedin" as const }]
    : []),
  { name: "Email", url: `mailto:${portfolio.email}`, icon: "email" as const },
  { name: "Phone", url: `tel:${portfolio.phone.replace(/\s/g, "")}`, icon: "phone" as const },
];

export const navSections = [
  { id: "header", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;
