import { useEffect, useState } from "react";

const items: [string, string, string][] = [
  ["01", "about", "About"],
  ["02", "academic", "Academic"],
  ["03", "capabilities", "Capabilities"],
  ["04", "work", "Selected Work"],
  ["05", "skills", "Skills"],
  ["06", "perspective", "Perspective"],
  ["07", "contact", "Contact"],
];

/** Quiet section index fixed to the left edge on wide screens. Highlights the section currently being read. */
export function SectionRail() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const elements = items
      .map(([, id]) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (elements.length === 0 || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Page sections" className="pointer-events-none fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 min-[1500px]:block">
      <ul className="flex flex-col gap-1">
        {items.map(([number, id, label]) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-label={label}
                aria-current={isActive ? "true" : undefined}
                className="pointer-events-auto group flex items-center gap-2 py-1.5"
              >
                <span className={`font-meta text-[10px] tracking-[0.12em] transition-colors ${isActive ? "text-accent" : "text-muted-foreground/70 group-hover:text-foreground"}`}>{number}</span>
                <span aria-hidden="true" className={`h-px transition-all duration-300 ${isActive ? "w-7 bg-accent" : "w-3 bg-border group-hover:w-5"}`} />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
