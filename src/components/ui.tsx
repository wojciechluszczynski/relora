import type { ReactNode } from "react";

type BadgeTone = "neutral" | "teal" | "gold" | "wine" | "green" | "blue";

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: BadgeTone;
}) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

export function Panel({
  title,
  eyebrow,
  action,
  children,
}: {
  title: string;
  eyebrow?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
          <h2>{title}</h2>
        </div>
        {action ? <div className="panel-action">{action}</div> : null}
      </div>
      {children}
    </section>
  );
}

export function Avatar({ initials, size = "md" }: { initials: string; size?: "md" | "lg" }) {
  return <span className={`avatar avatar-${size}`}>{initials}</span>;
}
