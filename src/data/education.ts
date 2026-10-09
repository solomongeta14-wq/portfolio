/**
 * Supporting content for the Education Journey section.
 * The education milestones themselves live in data/portfolio.ts.
 */

export type JourneySkill = {
  name: string;
  src: string;
  /** Rendered on a light tile for dark-on-transparent icons. */
  lightBackground?: boolean;
};

const devicon = (path: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}`;

/** Technologies used through the journey, shown as skill cards. */
export const journeySkills: JourneySkill[] = [
  { name: "HTML", src: devicon("html5/html5-original.svg") },
  { name: "CSS", src: devicon("css3/css3-original.svg") },
  { name: "JavaScript", src: devicon("javascript/javascript-original.svg") },
  { name: "Node.js", src: devicon("nodejs/nodejs-original.svg") },
  { name: "Express.js", src: devicon("express/express-original.svg"), lightBackground: true },
  { name: "Supabase", src: devicon("supabase/supabase-original.svg") },
  { name: "Git & GitHub", src: devicon("git/git-original.svg") },
  { name: "Docker", src: devicon("docker/docker-original.svg") },
];

/** A project built while learning — presented as experience, not a deployment. */
export const journeyProject = {
  name: "Pharmacy Management System",
  technology: "Java & Java Swing",
  description:
    "A desktop application project focused on pharmacy management with a graphical user interface.",
  technologies: ["Java", "Java Swing"],
};

export const educationStory = {
  headline: "From Curious Student to Future Software Engineer.",
  supporting:
    "Every great developer starts somewhere. My journey began in the classroom and continues today with every new concept I learn and every problem I solve.",
  paragraphs: [
    "From my first lessons at Wolaita Lika Primary School to building software at Dire Dawa University, one habit has carried me forward: asking how things work, then trying to build them better. Along the way I found that software is where curiosity, creativity, and problem-solving meet.",
    "I'm now growing into a capable software engineer, turning ideas into practical applications and learning to solve real-world problems — one concept, one project, and one commit at a time.",
  ],
};
