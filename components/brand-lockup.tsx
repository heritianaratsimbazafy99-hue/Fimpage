import Image from "next/image";

type BrandLockupProps = {
  className?: string;
  compact?: boolean;
  priority?: boolean;
  tone?: "hero" | "light";
};

function getClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function BrandLockup({
  className,
  compact = false,
  priority = false,
  tone = "hero",
}: BrandLockupProps) {
  const wrapperClasses =
    tone === "hero"
      ? "border border-white/10 bg-white/94 shadow-[0_18px_50px_rgba(15,23,42,0.16)]"
      : "border border-slate-200 bg-slate-50/95 shadow-[0_18px_50px_rgba(15,23,42,0.08)]";

  return (
    <div
      className={getClasses(
        "rounded-[1.75rem] p-4 text-slate-950 backdrop-blur",
        wrapperClasses,
        className,
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
        <div className="min-w-0 flex-1">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-slate-500">
            Identité officielle
          </p>
          <div className="mt-3">
            <Image
              src="/images/logos/fim-logo.png"
              alt="Logo FIM - Foire Internationale de Madagascar"
              width={compact ? 250 : 320}
              height={compact ? 105 : 135}
              priority={priority}
              className={getClasses(
                "h-auto max-w-full object-contain object-left",
                compact ? "w-[190px] sm:w-[220px]" : "w-[220px] sm:w-[280px]",
              )}
            />
          </div>
        </div>

        <div className="hidden h-16 w-px shrink-0 bg-slate-200 sm:block" />

        <div className="min-w-0 flex-1 sm:max-w-[220px]">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-slate-500">
            Organisation
          </p>
          <div className="mt-3 flex items-center">
            <Image
              src="/images/logos/madavision-logo.png"
              alt="Logo Mada Vision"
              width={compact ? 210 : 250}
              height={compact ? 93 : 110}
              priority={priority}
              className={getClasses(
                "h-auto max-w-full object-contain object-left",
                compact ? "w-[150px] sm:w-[170px]" : "w-[170px] sm:w-[210px]",
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
