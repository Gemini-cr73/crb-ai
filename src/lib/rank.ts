import type { Project, ProjectStatus } from "@/lib/types";

export function rankProjectsForSkill(
    projects: Project[],
    skillId: string
): Project[] {
    return [...projects].sort((a, b) => {
        const scoreA = scoreProjectForSkill(a, skillId);
        const scoreB = scoreProjectForSkill(b, skillId);

        if (scoreB !== scoreA) {
            return scoreB - scoreA;
        }

        return a.name.localeCompare(b.name);
    });
}

function scoreProjectForSkill(project: Project, skillId: string): number {
    let score = 0;

    if ((project.skills_used ?? []).includes(skillId)) {
        score += 10;
    }

    score += getStatusScore(project.status);
    score += Math.min(project.evidence?.length ?? 0, 5);

    return score;
}

function getStatusScore(status: ProjectStatus): number {
    switch (status) {
        case "live":
            return 5;
        case "in-progress":
            return 2;
        case "archived":
        default:
            return 0;
    }
}
