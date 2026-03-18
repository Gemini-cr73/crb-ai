import type { Project, Skill } from "@/lib/types";

function normalize(value?: string): string {
    return (value ?? "").trim().toLowerCase();
}

function buildSearchString(values: (string | undefined)[]): string {
    return values
        .map((v) => normalize(v))
        .filter(Boolean)
        .join(" ");
}

/* ─────────────────────────────────────────
   PROJECT FILTERING
───────────────────────────────────────── */
export function filterProjectsByTag(
    projects: Project[],
    tag: string
): Project[] {
    const target = normalize(tag);

    if (!target) return projects;

    return projects.filter((project) =>
        (project.primary_tags ?? []).some((projectTag) =>
            normalize(projectTag).includes(target)
        )
    );
}

/* ─────────────────────────────────────────
   PROJECT SEARCH
───────────────────────────────────────── */
export function searchProjects(
    projects: Project[],
    query: string
): Project[] {
    const q = normalize(query);

    if (!q) return projects;

    return projects.filter((project) => {
        const haystack = buildSearchString([
            project.name,
            project.one_liner,
            project.summary,
            ...(project.primary_tags ?? []),
            ...(project.skills_used ?? []),
            ...(project.evidence ?? []),
        ]);

        return haystack.includes(q);
    });
}

/* ─────────────────────────────────────────
   SKILL SEARCH
───────────────────────────────────────── */
export function searchSkills(
    skills: Skill[],
    query: string
): Skill[] {
    const q = normalize(query);

    if (!q) return skills;

    return skills.filter((skill) => {
        const haystack = buildSearchString([
            skill.label,
            skill.summary,
            skill.confidence,
            ...(skill.tools ?? []),
            ...(skill.evidence ?? []),
        ]);

        return haystack.includes(q);
    });
}
