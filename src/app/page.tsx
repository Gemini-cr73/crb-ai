import HeroBackground from "@/components/HeroBackground";
import { getProjects, getSite } from "@/lib/content";
import Link from "next/link";

function FeaturedProjectCard({
  project,
}: {
  project: ReturnType<typeof getProjects>[number];
}) {
  const previewTags = project.primary_tags?.slice(0, 3) ?? [];

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative flex min-h-[240px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/55 p-5 backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-blue-500/40 hover:bg-black/60 hover:shadow-[0_0_45px_rgba(59,130,246,0.16)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.05),transparent_42%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {project.status === "live" && (
        <span className="absolute right-4 top-4 rounded-full border border-emerald-800/80 bg-emerald-950/80 px-2 py-0.5 text-[10px] uppercase tracking-wide text-emerald-400">
          Live
        </span>
      )}

      <p className="mb-2 pr-14 text-[10px] uppercase tracking-[0.2em] text-zinc-500">
        {previewTags.length > 0 ? previewTags.join(" · ") : "Project"}
      </p>

      <h3 className="mb-2 text-base font-semibold tracking-tight text-zinc-100">
        {project.name}
      </h3>

      <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-300">
        {project.one_liner}
      </p>

      {previewTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {previewTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-black/35 px-2 py-0.5 text-[10px] text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <span className="absolute bottom-4 right-4 text-sm text-zinc-600">↗</span>
    </Link>
  );
}

export default function HomePage() {
  const { site, links, cta } = getSite();
  const projects = getProjects().slice(0, 4);

  return (
    <main className="site-shell relative min-h-screen overflow-x-hidden">
      <div className="site-bg" aria-hidden="true" />
      <div className="site-bg__veil" aria-hidden="true" />

      {/* Hero */}
      <section className="relative w-full overflow-hidden">
        <HeroBackground />

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 sm:py-24 md:py-28">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-zinc-400 backdrop-blur-md">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {site.location}
            </div>

            <div className="space-y-5">
              <h1 className="text-4xl font-semibold leading-[1.02] tracking-tight text-zinc-100 sm:text-5xl md:text-6xl">
                AI + Data + Cloud Engineer
                <br />
                building <span className="text-blue-400">production-grade</span>
                <br />
                ML &amp; LLM systems
              </h1>

              <p className="max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
                {site.subheadline}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={cta.primary.href}
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-blue-500 hover:shadow-[0_0_25px_rgba(59,130,246,0.45)] active:scale-95"
              >
                {cta.primary.label}
              </Link>

              <Link
                href={cta.secondary.href}
                className="rounded-xl border border-white/10 bg-black/35 px-5 py-2.5 text-sm text-zinc-200 transition-all duration-300 hover:scale-105 hover:border-zinc-400/60 hover:bg-black/50 hover:text-white"
              >
                {cta.secondary.label}
              </Link>

              <a
                href={links.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-400 underline-offset-4 transition-colors hover:text-zinc-200 hover:underline"
              >
                Download Resume ↗
              </a>
            </div>

            <div className="grid gap-4 pt-8 md:grid-cols-3">
              {[
                {
                  title: "Focus",
                  text: "ML-first applications, LLM systems, retrieval workflows, APIs, and cloud deployment.",
                },
                {
                  title: "Approach",
                  text: "I build portfolio-grade systems with evidence, architecture thinking, reproducible workflows, and practical deployment.",
                },
                {
                  title: "Signature",
                  text: "A skill graph and evidence-ledger approach that ties capabilities to real shipped work.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-md"
                >
                  <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                    {item.title}
                  </p>
                  <p className="text-sm leading-relaxed text-zinc-200">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects and rest of site */}
      <section className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24 space-y-16 -mt-32 pt-40">
        <section className="rounded-[28px] border border-white/5 bg-black/30 p-6 backdrop-blur-sm md:p-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                Featured Projects
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
                Selected work
              </h2>
            </div>

            <Link
              href="/projects"
              className="text-sm text-blue-400 transition-colors hover:text-blue-300"
            >
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {projects.map((project) => (
              <FeaturedProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-5 rounded-3xl border border-white/5 bg-black/30 p-6 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
              Explore deeper
            </p>
            <h2 className="text-xl font-semibold tracking-tight text-zinc-100">
              Skills, projects, and evidence — connected.
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-zinc-400">
              Explore the skills graph, review case studies, and see how each
              capability connects to shipped work.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/skills"
              className="rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-200 transition-all duration-300 hover:border-zinc-400/60 hover:bg-black/40 hover:text-white"
            >
              Explore Skills
            </Link>
            <Link
              href="/projects"
              className="rounded-xl bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 transition-all duration-300 hover:bg-white"
            >
              Browse Projects
            </Link>
          </div>
        </section>

        <section className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/5 pt-6 text-sm text-zinc-600">
          <a
            href={links.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-zinc-300"
          >
            GitHub ↗
          </a>

          <a
            href={links.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-zinc-300"
          >
            LinkedIn ↗
          </a>

          <a
            href={`mailto:${links.email}`}
            className="transition-colors hover:text-zinc-300"
          >
            Email ↗
          </a>
        </section>
      </section>
    </main>
  );
}
