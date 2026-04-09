import type { SessionType } from "@/lib/types";

const badgeStyles: Record<SessionType, string> = {
  Atelier:
    "border-orange-200 bg-orange-50 text-orange-700 shadow-sm shadow-orange-100/50",
  Conférence:
    "border-violet-200 bg-violet-50 text-violet-700 shadow-sm shadow-violet-100/50",
  "Table ronde":
    "border-sky-200 bg-sky-50 text-sky-700 shadow-sm shadow-sky-100/50",
  "Speed recruiting":
    "border-emerald-200 bg-emerald-50 text-emerald-700 shadow-sm shadow-emerald-100/50",
};

export function SessionTypeBadge({ type }: { type: SessionType }) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.18em] uppercase",
        badgeStyles[type],
      ].join(" ")}
    >
      {type}
    </span>
  );
}
