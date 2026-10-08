import { Mail, Phone } from "lucide-react";
import { socialLinks } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const iconClass = "h-[1.15rem] w-[1.15rem]";

export default function Socials({
  orientation = "row",
  className,
}: {
  orientation?: "row" | "column";
  className?: string;
}) {
  return (
    <div
      className={cn(
        orientation === "row" ? "flex items-center gap-0.5" : "flex flex-col items-center gap-2",
        className,
      )}
    >
      {socialLinks.map((link) => {
        const external = link.url.startsWith("http");
        return (
          <a
            key={link.name}
            href={link.url}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            aria-label={link.name}
            title={link.name}
            className="rounded-full p-1.5 text-lo transition-colors duration-200 hover:text-accent"
          >
            {link.icon === "github" && <GithubIcon className={iconClass} />}
            {link.icon === "linkedin" && <LinkedinIcon className={iconClass} />}
            {link.icon === "email" && <Mail className={iconClass} />}
            {link.icon === "phone" && <Phone className={iconClass} />}
          </a>
        );
      })}
    </div>
  );
}
