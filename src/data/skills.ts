/**
 * Skill groups. Icons are either CDN images (devicon) rendered through
 * <SkillIcon/>, or lucide icons referenced by name from ICON_KEYS.
 */

export type SkillIconSpec =
  | { kind: "image"; src: string; lightBackground?: boolean }
  | { kind: "lucide"; name: "braces" | "layers" | "globe" | "database" | "blocks" | "workflow" };

export type Skill = {
  name: string;
  icon: SkillIconSpec;
};

export type SkillGroup = {
  title: string;
  accent: "lime" | "gold" | "dim";
  skills: Skill[];
};

const devicon = (path: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}`;

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    accent: "lime",
    skills: [
      { name: "HTML", icon: { kind: "image", src: devicon("html5/html5-original.svg") } },
      { name: "CSS", icon: { kind: "image", src: devicon("css3/css3-original.svg") } },
      {
        name: "JavaScript",
        icon: { kind: "image", src: devicon("javascript/javascript-original.svg") },
      },
      { name: "React", icon: { kind: "image", src: devicon("react/react-original.svg") } },
    ],
  },
  {
    title: "Backend",
    accent: "gold",
    skills: [
      { name: "Node.js", icon: { kind: "image", src: devicon("nodejs/nodejs-original.svg") } },
      {
        name: "Express.js",
        icon: { kind: "image", src: devicon("express/express-original.svg"), lightBackground: true },
      },
      {
        name: "REST APIs",
        icon: { kind: "lucide", name: "workflow" },
      },
    ],
  },
  {
    title: "Database",
    accent: "lime",
    skills: [
      {
        name: "Supabase",
        icon: { kind: "image", src: devicon("supabase/supabase-original.svg") },
      },
      { name: "Database Integration", icon: { kind: "lucide", name: "database" } },
    ],
  },
  {
    title: "DevOps",
    accent: "dim",
    skills: [
      { name: "Docker", icon: { kind: "image", src: devicon("docker/docker-original.svg") } },
    ],
  },
  {
    title: "General",
    accent: "gold",
    skills: [
      { name: "Full-Stack Development", icon: { kind: "lucide", name: "layers" } },
      { name: "Web Development", icon: { kind: "lucide", name: "globe" } },
      { name: "Software Engineering", icon: { kind: "lucide", name: "blocks" } },
      { name: "JavaScript Ecosystem", icon: { kind: "lucide", name: "braces" } },
    ],
  },
];
