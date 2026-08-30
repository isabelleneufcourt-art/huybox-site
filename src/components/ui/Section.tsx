import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  tone?: "white" | "neutral" | "primary";
  id?: string;
}

const toneClasses = {
  white: "bg-white",
  neutral: "bg-neutral-50",
  primary: "bg-primary text-white",
};

export function Section({ children, className, tone = "white", id }: SectionProps) {
  return (
    <section id={id} className={cn("section-y", toneClasses[tone], className)}>
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <div className={cn("mb-10 max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-secondary">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-lg text-neutral-600">{description}</p>}
    </div>
  );
}
