export function Footer() {
  return (
    <footer className="section-shell pb-12 pt-4">
      <div className="rounded-[2rem] border border-slate-200 bg-white px-6 py-8 text-slate-600 shadow-[0_16px_40px_rgba(15,23,42,0.05)] sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-fim-blue">
              FIM 2026
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-7">
              Landing page d’inscription conçue pour accueillir un programme
              évolutif, un formulaire sur mesure et une connexion légère vers
              Google Sheets / Google Workspace.
            </p>
          </div>

          <div className="grid gap-2 text-sm">
            <a href="#programme" className="transition hover:text-fim-blue">
              Programme
            </a>
            <a href="#inscription" className="transition hover:text-fim-blue">
              Inscription
            </a>
            <a href="mailto:inscription@fim.mg" className="transition hover:text-fim-blue">
              inscription@fim.mg
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

