"use client";

import { getProjectsBySkill, getSkills } from "@/lib/content";
import { searchSkills } from "@/lib/filters";
import { buildSkillGraph } from "@/lib/graph";
import { rankProjectsForSkill } from "@/lib/rank";
import type { Project, Skill } from "@/lib/types";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";

function ConfidenceBadge({ level }: { level: string }) {
    const styles: Record<string, string> = {
        production: "border-blue-800 bg-blue-950 text-blue-300",
        shipped: "border-emerald-800 bg-emerald-950 text-emerald-300",
        academic: "border-violet-800 bg-violet-950 text-violet-300",
        learning: "border-zinc-700 bg-zinc-900 text-zinc-400",
    };

    return (
        <span
            className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wide transition-colors ${styles[level] ?? styles.learning
                }`}
        >
            {level}
        </span>
    );
}

function SkillRow({
    skill,
    selected,
    onSelect,
}: {
    skill: Skill;
    selected: boolean;
    onSelect: (id: string) => void;
}) {
    const tools = skill.tools ?? [];
    const proofCount = skill.evidence?.length ?? 0;

    return (
        <button
            type="button"
            onClick={() => onSelect(skill.id)}
            className={`group flex w-full items-start justify-between gap-4 border-b border-zinc-800 px-4 py-3 text-left transition-all duration-300 hover:bg-zinc-900/90 ${selected
                ? "border-l-2 border-l-blue-500 bg-zinc-900 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.08)]"
                : ""
                }`}
        >
            <div className="min-w-0 space-y-1">
                <p className="text-sm font-medium text-zinc-100 transition-colors duration-300 group-hover:text-white">
                    {skill.label}
                </p>

                <p className="line-clamp-2 text-xs leading-relaxed text-zinc-500 transition-colors duration-300 group-hover:text-zinc-300">
                    {skill.summary}
                </p>

                {tools.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                        {tools.map((tool) => (
                            <span
                                key={tool}
                                className="rounded-md border border-zinc-800 bg-zinc-900 px-1.5 py-px text-[10px] text-zinc-500 transition-all duration-300 group-hover:border-zinc-700 group-hover:text-zinc-300"
                            >
                                {tool}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex flex-shrink-0 flex-col items-end gap-1.5 pt-0.5">
                <ConfidenceBadge level={skill.confidence} />
                <span className="text-[10px] text-zinc-600 transition-colors duration-300 group-hover:text-zinc-400">
                    {proofCount} proof{proofCount !== 1 ? "s" : ""}
                </span>
            </div>
        </button>
    );
}

function EvidenceCard({ project }: { project: Project }) {
    const evidence = project.evidence ?? [];
    const tags = project.primary_tags ?? [];

    return (
        <div className="group space-y-3 border-b border-zinc-800 p-4 transition-all duration-300 hover:bg-zinc-900/60">
            <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                    <p className="text-sm font-medium text-zinc-100 transition-colors duration-300 group-hover:text-white">
                        {project.name}
                    </p>
                    <p className="text-xs leading-relaxed text-zinc-500 transition-colors duration-300 group-hover:text-zinc-300">
                        {project.one_liner}
                    </p>
                </div>

                <span
                    className={`flex-shrink-0 rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wide transition-all duration-300 ${project.status === "live"
                        ? "border-emerald-800 bg-emerald-950 text-emerald-400 group-hover:border-emerald-700 group-hover:text-emerald-300"
                        : "border-yellow-800 bg-yellow-950 text-yellow-400 group-hover:border-yellow-700 group-hover:text-yellow-300"
                        }`}
                >
                    {project.status === "live" ? "Live" : "In Progress"}
                </span>
            </div>

            {evidence.length > 0 && (
                <ul className="space-y-1">
                    {evidence.map((proof, index) => (
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

            {tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full border border-zinc-800 bg-zinc-900 px-2 py-0.5 text-[10px] text-zinc-500 transition-all duration-300 group-hover:border-zinc-700 group-hover:text-zinc-300"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            <div className="flex flex-wrap gap-4 text-xs text-blue-400">
                <Link
                    href={`/projects/${project.slug}`}
                    className="transition-colors hover:text-blue-300"
                >
                    Case Study ↗
                </Link>

                {project.links?.live_demo && (
                    <a
                        href={project.links.live_demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-blue-300"
                    >
                        Live Demo ↗
                    </a>
                )}

                {project.links?.github && (
                    <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-blue-300"
                    >
                        GitHub ↗
                    </a>
                )}

                {project.links?.api && (
                    <a
                        href={project.links.api}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-blue-300"
                    >
                        API Docs ↗
                    </a>
                )}
            </div>
        </div>
    );
}

function SkillGraphCanvas({
    skillsData,
    selectedSkillId,
    onSelectSkill,
}: {
    skillsData: ReturnType<typeof getSkills>;
    selectedSkillId: string | null;
    onSelectSkill: (id: string) => void;
}) {
    const { nodes, edges } = useMemo(() => buildSkillGraph(skillsData), [skillsData]);

    const categoryPositions: Record<string, { x: number; y: number }> = {
        ai_llms: { x: 175, y: 95 },
        ml: { x: 360, y: 135 },
        data_eng: { x: 110, y: 265 },
        cloud_devops: { x: 245, y: 345 },
        backend: { x: 395, y: 315 },
    };

    const nodePositions = useMemo(() => {
        const positions: Record<string, { x: number; y: number }> = {};
        const categorySkillCount: Record<string, number> = {};

        nodes.forEach((node) => {
            if (node.kind === "category") {
                positions[node.id] = categoryPositions[node.id] ?? { x: 280, y: 200 };
                return;
            }

            const categoryId = node.category_id ?? "";
            const categoryPosition = categoryPositions[categoryId] ?? { x: 280, y: 200 };
            const index = categorySkillCount[categoryId] ?? 0;

            categorySkillCount[categoryId] = index + 1;

            const angle = (index * (Math.PI * 2)) / 5 - Math.PI / 2;

            positions[node.id] = {
                x: categoryPosition.x + Math.cos(angle) * 62,
                y: categoryPosition.y + Math.sin(angle) * 52,
            };
        });

        return positions;
    }, [nodes]);

    const categoryColors: Record<string, string> = {
        ai_llms: "#4f8eff",
        ml: "#7c5cfc",
        data_eng: "#23d5ab",
        cloud_devops: "#f0a020",
        backend: "#e0608a",
    };

    const connectedNodeIds = useMemo(() => {
        if (!selectedSkillId) return new Set<string>();

        const connected = new Set<string>([selectedSkillId]);

        edges.forEach((edge) => {
            if (edge.source === selectedSkillId) connected.add(edge.target);
            if (edge.target === selectedSkillId) connected.add(edge.source);
        });

        return connected;
    }, [edges, selectedSkillId]);

    return (
        <svg viewBox="0 0 520 420" className="h-full w-full" aria-label="Skill graph">
            {edges.map((edge, index) => {
                const from = nodePositions[edge.source];
                const to = nodePositions[edge.target];

                if (!from || !to) return null;

                const isCoOccurrence = edge.kind === "co_occurs";
                const isConnected =
                    selectedSkillId &&
                    (edge.source === selectedSkillId || edge.target === selectedSkillId);

                return (
                    <line
                        key={`${edge.source}-${edge.target}-${index}`}
                        x1={from.x}
                        y1={from.y}
                        x2={to.x}
                        y2={to.y}
                        stroke={isConnected ? "rgba(255,255,255,0.26)" : "rgba(255,255,255,0.08)"}
                        strokeWidth={isConnected ? (isCoOccurrence ? 1.2 : 1.8) : isCoOccurrence ? 0.8 : 1.1}
                        strokeDasharray={isCoOccurrence ? "3 4" : undefined}
                        className="transition-all duration-300"
                    />
                );
            })}

            {nodes.map((node) => {
                const position = nodePositions[node.id];
                if (!position) return null;

                const categoryId = node.kind === "category" ? node.id : node.category_id ?? "";
                const color = categoryColors[categoryId] ?? "#888";
                const isSelected = node.id === selectedSkillId;
                const isCategory = node.kind === "category";
                const isConnected = !selectedSkillId || connectedNodeIds.has(node.id);
                const isDimmed = selectedSkillId && !connectedNodeIds.has(node.id);

                return (
                    <g
                        key={node.id}
                        transform={`translate(${position.x}, ${position.y})`}
                        onClick={() => {
                            if (!isCategory) onSelectSkill(node.id);
                        }}
                        className={isCategory ? "" : "cursor-pointer"}
                        role={isCategory ? undefined : "button"}
                        aria-label={node.label}
                    >
                        <circle
                            r={isCategory ? 28 : isSelected ? 22 : 18}
                            fill={isSelected ? `${color}33` : `${color}18`}
                            stroke={color}
                            strokeWidth={isSelected ? 1.8 : isCategory ? 1 : 0.8}
                            strokeOpacity={isDimmed ? 0.15 : isSelected ? 0.95 : isCategory ? 0.6 : 0.45}
                            opacity={isConnected ? 1 : 0.32}
                            className="transition-all duration-300"
                        />

                        {!isCategory && (
                            <circle
                                r={isSelected ? 30 : 24}
                                fill="none"
                                stroke={color}
                                strokeWidth={0.5}
                                strokeOpacity={isSelected ? 0.28 : 0}
                                opacity={isConnected ? 1 : 0.32}
                                className="transition-all duration-300"
                            />
                        )}

                        {isSelected && (
                            <circle
                                r={28}
                                fill="none"
                                stroke={color}
                                strokeWidth={0.6}
                                strokeOpacity={0.25}
                            />
                        )}

                        <text
                            textAnchor="middle"
                            dominantBaseline="central"
                            fill={color}
                            fontSize={isCategory ? 10 : 9}
                            fontWeight={isCategory ? 500 : isSelected ? 600 : 400}
                            opacity={isConnected ? 1 : 0.32}
                        >
                            {node.label.length > 12 ? `${node.label.slice(0, 11)}…` : node.label}
                        </text>
                    </g>
                );
            })}

            <g transform="translate(18, 392)">
                <circle cx="0" cy="0" r="4" fill="#f0a020" />
                <text x="10" y="4" fill="rgba(155,153,143,0.75)" fontSize="9">
                    selected
                </text>

                <circle
                    cx="70"
                    cy="0"
                    r="4"
                    fill="none"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="1"
                />
                <text x="80" y="4" fill="rgba(155,153,143,0.75)" fontSize="9">
                    skill
                </text>
            </g>
        </svg>
    );
}

type ViewMode = "list" | "graph";

export default function SkillsPage() {
    const skillsData = useMemo(() => getSkills(), []);
    const [view, setView] = useState<ViewMode>("graph");
    const [selectedSkillId, setSelectedSkillId] = useState<string | null>("docker");
    const [query, setQuery] = useState("");

    const filteredSkills = useMemo(() => {
        return searchSkills(skillsData.skills, query);
    }, [skillsData.skills, query]);

    const ledgerProjects: Project[] = useMemo(() => {
        if (!selectedSkillId) return [];
        const rawProjects = getProjectsBySkill(selectedSkillId);
        return rankProjectsForSkill(rawProjects, selectedSkillId);
    }, [selectedSkillId]);

    const handleSelectSkill = useCallback((id: string) => {
        setSelectedSkillId((previous) => (previous === id ? null : id));
    }, []);

    const selectedSkill =
        skillsData.skills.find((skill) => skill.id === selectedSkillId) ?? null;

    return (
        <main className="mx-auto flex w-full max-w-7xl flex-col px-0 py-0">
            <section className="border-t border-zinc-900">
                <div className="border-b border-zinc-800 px-4 py-3 sm:px-6">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                        Skills — Skill Graph + Evidence Ledger
                    </p>
                </div>

                <div className="grid min-h-[720px] grid-cols-1 lg:grid-cols-[54%_46%]">
                    <div className="border-b border-zinc-800 lg:border-b-0 lg:border-r">
                        <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3 sm:px-5">
                            <p className="text-sm font-medium text-zinc-200">Skill Graph</p>

                            <div className="flex items-center gap-2">
                                <div className="hidden sm:block">
                                    <input
                                        type="search"
                                        placeholder="Search skills..."
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        className="w-40 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-300 placeholder:text-zinc-600 focus:border-zinc-700 focus:outline-none"
                                    />
                                </div>

                                <div className="flex overflow-hidden rounded-full border border-zinc-800 text-[11px]">
                                    <button
                                        type="button"
                                        onClick={() => setView("graph")}
                                        className={`px-3 py-1.5 transition-colors ${view === "graph"
                                            ? "bg-zinc-800 text-zinc-100"
                                            : "bg-transparent text-zinc-500 hover:text-zinc-300"
                                            }`}
                                    >
                                        Graph
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setView("list")}
                                        className={`px-3 py-1.5 transition-colors ${view === "list"
                                            ? "bg-zinc-800 text-zinc-100"
                                            : "bg-transparent text-zinc-500 hover:text-zinc-300"
                                            }`}
                                    >
                                        List
                                    </button>
                                </div>
                            </div>
                        </div>

                        {view === "graph" ? (
                            <div className="h-[580px] px-2 py-2 sm:px-4 sm:py-4">
                                <SkillGraphCanvas
                                    skillsData={skillsData}
                                    selectedSkillId={selectedSkillId}
                                    onSelectSkill={handleSelectSkill}
                                />
                            </div>
                        ) : (
                            <div className="max-h-[580px] overflow-y-auto">
                                {skillsData.categories.map((category) => {
                                    const categorySkills = filteredSkills.filter(
                                        (skill) => skill.category_id === category.id
                                    );

                                    if (!categorySkills.length) return null;

                                    return (
                                        <div key={category.id}>
                                            <div className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950 px-4 py-2">
                                                <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                                                    {category.label}
                                                </p>
                                            </div>

                                            {categorySkills.map((skill) => (
                                                <SkillRow
                                                    key={skill.id}
                                                    skill={skill}
                                                    selected={selectedSkillId === skill.id}
                                                    onSelect={handleSelectSkill}
                                                />
                                            ))}
                                        </div>
                                    );
                                })}

                                {filteredSkills.length === 0 && (
                                    <div className="px-4 py-10 text-center">
                                        <p className="text-sm text-zinc-500">
                                            No skills match your search.
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="border-t border-zinc-800 px-4 py-3 sm:hidden">
                            <input
                                type="search"
                                placeholder="Search skills..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-300 placeholder:text-zinc-600 focus:border-zinc-700 focus:outline-none"
                            />
                        </div>
                    </div>

                    <aside className="bg-zinc-950">
                        <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3 sm:px-5">
                            <p className="text-sm font-medium text-zinc-200">Evidence Ledger</p>

                            {selectedSkill && (
                                <span className="rounded-full border border-blue-800 bg-blue-950 px-2.5 py-1 text-[10px] text-blue-300">
                                    {selectedSkill.label}
                                </span>
                            )}
                        </div>

                        <div className="max-h-[648px] overflow-y-auto">
                            {!selectedSkillId ? (
                                <div className="flex h-64 flex-col items-center justify-center gap-3 px-6 text-center">
                                    <p className="text-sm text-zinc-600">
                                        Select a skill to see evidence
                                    </p>
                                    <p className="max-w-xs text-xs text-zinc-700">
                                        Each skill is backed by shipped projects, proof points, live
                                        demos, GitHub repositories, and API docs.
                                    </p>
                                </div>
                            ) : ledgerProjects.length === 0 ? (
                                <div className="px-4 py-6">
                                    <p className="text-xs text-zinc-600">
                                        No projects found for this skill yet.
                                    </p>
                                </div>
                            ) : (
                                ledgerProjects.map((project) => (
                                    <EvidenceCard key={project.id} project={project} />
                                ))
                            )}
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
}
