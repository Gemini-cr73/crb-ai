import type { GraphEdge, GraphNode, SkillGraph, SkillsData } from "@/lib/types";

export function buildSkillGraph(skillsData: SkillsData): SkillGraph {
    const categoryNodes = buildCategoryNodes(skillsData);
    const skillNodes = buildSkillNodes(skillsData);
    const belongsToEdges = buildBelongsToEdges(skillsData);
    const coOccurrenceEdges = buildCoOccurrenceEdges(skillsData);

    return {
        nodes: [...categoryNodes, ...skillNodes],
        edges: [...belongsToEdges, ...coOccurrenceEdges],
    };
}

function buildCategoryNodes(skillsData: SkillsData): GraphNode[] {
    return (skillsData.categories ?? []).map((category) => ({
        id: category.id,
        label: category.label,
        kind: "category",
    }));
}

function buildSkillNodes(skillsData: SkillsData): GraphNode[] {
    return (skillsData.skills ?? []).map((skill) => ({
        id: skill.id,
        label: skill.label,
        kind: "skill",
        category_id: skill.category_id,
    }));
}

function buildBelongsToEdges(skillsData: SkillsData): GraphEdge[] {
    return (skillsData.skills ?? []).map((skill) => ({
        source: skill.id,
        target: skill.category_id,
        kind: "belongs_to",
    }));
}

function buildCoOccurrenceEdges(skillsData: SkillsData): GraphEdge[] {
    const edges: GraphEdge[] = [];
    const seen = new Set<string>();

    const skillsByCategory = new Map<string, string[]>();

    for (const skill of skillsData.skills ?? []) {
        const categoryId = skill.category_id;
        const currentSkills = skillsByCategory.get(categoryId) ?? [];
        currentSkills.push(skill.id);
        skillsByCategory.set(categoryId, currentSkills);
    }

    for (const [, skillIds] of skillsByCategory) {
        const sortedSkillIds = [...skillIds].sort();

        for (let i = 0; i < sortedSkillIds.length; i += 1) {
            for (let j = i + 1; j < sortedSkillIds.length; j += 1) {
                const source = sortedSkillIds[i];
                const target = sortedSkillIds[j];
                const edgeKey = `${source}::${target}`;

                if (seen.has(edgeKey)) continue;

                seen.add(edgeKey);
                edges.push({
                    source,
                    target,
                    kind: "co_occurs",
                });
            }
        }
    }

    return edges;
}
