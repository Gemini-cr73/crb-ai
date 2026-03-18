"use client";

import { getProjects } from "@/lib/content";
import { filterProjectsByTag, searchProjects } from "@/lib/filters";
import type { Project } from "@/lib/types";
import Link from "next/link";
import { useMemo, useState } from "react";

function ProjectCard({ project }: { project: Project }) {
    const previewTags = project.primary_tags?.slice(0, 4) ?? [];
    const previewEvidence = project.evidence?.slice(0, 2) ?? [];

    return (
        <Link
            href={`/projects/${project.slug}`}
            className="group relative flex min-h-[280px] flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-blue-500/40 hover:bg-zinc-900 hover:shadow-[0_0_35px_rgba(59,130,246,0.12)]"
        >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_40%)]" />

            {project.status === "live" && (
                <span className="absolute right-4 top-4 rounded-full border border-emerald-800 bg-emerald-950 px-2 py-0.5 text-[10px] uppercase tracking-wide text-emerald-400 transition-all duration-300 group-hover:border-emerald-600 group-hover:bg-emerald-900/70 group-hover:text-emerald-300">
                    Live
                </span>
            )}

            <p className="mb-2 pr-14 text-[10px] uppercase tracking-[0.2em] text-zinc-500 transition-colors duration-300 group-hover:text-zinc-300">
                {previewTags.length > 0 ? previewTags.slice(0, 2).join(" · ") : "Project"}
            </p>

            <h2 className="mb-2 text-base font-semibold tracking-tight text-zinc-100 transition-colors duration-300 group-hover:text-white">
                {project.name}
            </h2>

            <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-400 transition-colors duration-300 group-hover:text-zinc-200">
                {project.one_liner}
            </p>

            {previewEvidence.length > 0 && (
                <ul className="mb-4 space-y-1.5">
                    {previewEvidence.map((proof, index) => (
                        <li
                            key={`${project.id}-proof-${index}`}
                            className="relative pl-3 text-[11px] leading-snug text-zinc-600 transition-colors duration-300 group-hover:text-zinc-300"
                        >
                            <span className="absolute left-0 text-zinc-700 transition-colors duration-300 group-hover:text-zinc-400">
                                —
                            </span>
                            {proof}
                        </li>
                    ))}
                </ul>
            )}

            {previewTags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                    {previewTags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full border border-zinc-800 bg-zinc-900 px-2 py-0.5 text-[10px] text-zinc-500 transition-all duration-300 group-hover:border-zinc-600 group-hover:bg-zinc-800/90 group-hover:text-zinc-300"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            <span className="absolute bottom-4 right-4 text-sm text-zinc-700 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-blue-300">
                ↗
            </span>
        </Link>
    );
}

function FilterBar({
    tags,
    activeTag,
    onTag,
    query,
    onQuery,
}: {
    tags: string[];
    activeTag: string;
    onTag: (tag: string) => void;
    query: string;
    onQuery: (value: string) => void;
}) {
    return (
        <div className="flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
            <input
                type="search"
                placeholder="Search projects..."
                value={query}
                onChange={(e) => onQuery(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-300 placeholder:text-zinc-600 transition-colors focus:border-zinc-600 focus:outline-none sm:max-w-xs"
            />

            <div className="flex flex-wrap gap-2">
                <button
                    type="button"
                    onClick={() => onTag("")}
                    className={`rounded-full border px-3 py-1 text-xs transition-all duration-200 ${!activeTag
                        ? "border-zinc-700 bg-zinc-800 text-zinc-100"
                        : "border-zinc-800 bg-transparent text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                        }`}
                >
                    All
                </button>

                {tags.map((tag) => (
                    <button
                        key={tag}
                        type="button"
                        onClick={() => onTag(tag === activeTag ? "" : tag)}
                        className={`rounded-full border px-3 py-1 text-xs transition-all duration-200 ${activeTag === tag
                            ? "border-zinc-700 bg-zinc-800 text-zinc-100"
                            : "border-zinc-800 bg-transparent text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                            }`}
                    >
                        {tag}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default function ProjectsPage() {
    const allProjects = useMemo(() => getProjects(), []);
    const [activeTag, setActiveTag] = useState("");
    const [query, setQuery] = useState("");

    const allTags = useMemo(() => {
        return Array.from(new Set(allProjects.flatMap((project) => project.primary_tags))).sort();
    }, [allProjects]);

    const filteredProjects: Project[] = useMemo(() => {
        let result = allProjects;

        if (activeTag) {
            result = filterProjectsByTag(result, activeTag);
        }

        if (query.trim()) {
            result = searchProjects(result, query.trim());
        }

        return result;
    }, [allProjects, activeTag, query]);

    return (
        <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12">
            <section className="space-y-3">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    Projects
                </p>

                <h1 className="text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl">
                    Shipped work backed by real evidence.
                </h1>

                <p className="max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
                    A portfolio of AI, data, cloud, and engineering projects with live demos,
                    architecture thinking, and implementation depth.
                </p>
            </section>

            <FilterBar
                tags={allTags}
                activeTag={activeTag}
                onTag={setActiveTag}
                query={query}
                onQuery={setQuery}
            />

            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                <span>
                    {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
                </span>

                {activeTag && (
                    <span className="rounded-full border border-zinc-800 bg-zinc-900 px-2 py-1 text-zinc-400">
                        Tag: {activeTag}
                    </span>
                )}

                {query.trim() && (
                    <span className="rounded-full border border-zinc-800 bg-zinc-900 px-2 py-1 text-zinc-400">
                        Search: {query.trim()}
                    </span>
                )}
            </div>

            {filteredProjects.length > 0 ? (
                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-2">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </section>
            ) : (
                <section className="rounded-2xl border border-zinc-800 bg-zinc-950/60 px-6 py-14 text-center">
                    <p className="text-sm text-zinc-500">
                        No projects match your current search or filter.
                    </p>

                    <button
                        type="button"
                        onClick={() => {
                            setActiveTag("");
                            setQuery("");
                        }}
                        className="mt-4 text-sm text-blue-400 transition-colors hover:text-blue-300"
                    >
                        Clear filters
                    </button>
                </section>
            )}
        </main>
    );
}
