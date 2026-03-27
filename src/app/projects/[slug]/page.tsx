import { getProjectBySlug, getProjects, getSkills } from "@/lib/content";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    return getProjects().map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        return {
            title: "Project Not Found",
        };
    }

    return {
        title: `${project.name} · crbdev.com`,
        description: project.one_liner,
    };
}

function SkillChip({
    skillId,
    label,
}: {
    skillId: string;
    label: string;
}) {
    return (
        <Link
            href={`/skills?skill=${skillId}`}
            className="rounded-xl border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-[11px] text-zinc-400 transition-all duration-300 hover:border-zinc-600 hover:bg-zinc-800 hover:text-zinc-200"
        >
            {label}
        </Link>
    );
}

export default async function ProjectCaseStudyPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    const skillsData = getSkills();

    const usedSkills =
        project.skills_used?.map((id) => ({
            id,
            label: skillsData.skills.find((skill) => skill.id === id)?.label ?? id,
        })) ?? [];

    const topTags = project.primary_tags?.slice(0, 3) ?? [];
    const evidence = project.evidence ?? [];

    return (
        <main className="mx-auto flex w-full max-w-4xl flex-col gap-12 px-6 py-12 sm:py-16">
            <nav className="flex items-center gap-2 text-xs text-zinc-600">
                <Link href="/projects" className="transition-colors hover:text-zinc-400">
                    Projects
                </Link>
                <span>/</span>
                <span className="text-zinc-400">{project.name}</span>
            </nav>

            <header className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-2">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                            {topTags.length > 0 ? topTags.join(" · ") : "Project"}
                        </p>

                        <h1 className="text-3xl font-semibold leading-tight tracking-tight text-zinc-100 sm:text-4xl">
                            {project.name}
                        </h1>
                    </div>

                    <span
                        className={`inline-flex w-fit flex-shrink-0 rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-wide ${project.status === "live"
                            ? "border-emerald-800 bg-emerald-950 text-emerald-400"
                            : "border-yellow-800 bg-yellow-950 text-yellow-400"
                            }`}
                    >
                        {project.status === "live" ? "Live" : "In Progress"}
                    </span>
                </div>

                <p className="max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
                    {project.one_liner}
                </p>

                <div className="flex flex-wrap gap-3 pt-1">
                    {project.links?.live_demo && (
                        <a
                            href={project.links.live_demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.22)]"
                        >
                            Live Demo ↗
                        </a>
                    )}

                    {project.links?.github && (
                        <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition-all duration-300 hover:border-zinc-500 hover:bg-zinc-900 hover:text-white"
                        >
                            GitHub ↗
                        </a>
                    )}

                    {project.links?.api && (
                        <a
                            href={project.links.api}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-xl border border-zinc-800 px-4 py-2 text-sm text-zinc-500 transition-all duration-300 hover:border-zinc-600 hover:bg-zinc-900 hover:text-zinc-300"
                        >
                            API Docs ↗
                        </a>
                    )}
                </div>
            </header>

            {project.summary && (
                <section className="space-y-3">
                    <h2 className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                        Overview
                    </h2>
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">
                        <p className="text-sm leading-relaxed text-zinc-300">
                            {project.summary}
                        </p>
                    </div>
                </section>
            )}

            {evidence.length > 0 && (
                <section className="space-y-4">
                    <h2 className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                        Evidence
                    </h2>

                    <ul className="space-y-3">
                        {evidence.map((proof, index) => (
                            <li
                                key={`${project.id}-evidence-${index}`}
                                className="group flex items-start gap-3 rounded-2xl border border-zinc-800 bg-zinc-950 p-4 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/80"
                            >
                                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-[10px] font-medium text-zinc-500 transition-colors duration-300 group-hover:text-zinc-300">
                                    {index + 1}
                                </span>

                                <p className="text-sm leading-relaxed text-zinc-300 transition-colors duration-300 group-hover:text-zinc-100">
                                    {proof}
                                </p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {usedSkills.length > 0 && (
                <section className="space-y-4">
                    <h2 className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                        Skills Used
                    </h2>

                    <div className="flex flex-wrap gap-2">
                        {usedSkills.map(({ id, label }) => (
                            <SkillChip key={id} skillId={id} label={label} />
                        ))}
                    </div>

                    <p className="pt-1 text-xs text-zinc-700">
                        Click any skill to view related work in the Skills section.
                    </p>
                </section>
            )}

            <div className="border-t border-zinc-800 pt-4">
                <Link
                    href="/projects"
                    className="text-sm text-zinc-600 transition-colors hover:text-zinc-300"
                >
                    ← Back to Projects
                </Link>
            </div>
        </main>
    );
}
