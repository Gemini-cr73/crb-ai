import projectsData from "@/data/projects.json";
import siteData from "@/data/site.json";
import skillsData from "@/data/skills.json";
import type {
    Project,
    SiteData,
    Skill,
    SkillCategory,
    SkillsData,
} from "@/lib/types";

const site = siteData as SiteData;
const projects = projectsData as Project[];
const skills = skillsData as SkillsData;

export function getSite(): SiteData {
    return site;
}

export function getProjects(): Project[] {
    return projects;
}

export function getAllProjects(): Project[] {
    return projects;
}

export function getFeaturedProjects(limit = 4): Project[] {
    return projects.filter((project) => project.status === "live").slice(0, limit);
}

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find((project) => project.slug === slug);
}

export function getSkills(): SkillsData {
    return skills;
}

export function getAllSkills(): Skill[] {
    return skills.skills;
}

export function getAllSkillCategories(): SkillCategory[] {
    return skills.categories;
}

export function getSkillById(skillId: string): Skill | undefined {
    return skills.skills.find((skill) => skill.id === skillId);
}

export function getSkillsByIds(ids: string[]): Skill[] {
    return ids
        .map((id) => getSkillById(id))
        .filter((skill): skill is Skill => Boolean(skill));
}

export function getSkillsByCategory(categoryId: string): Skill[] {
    return skills.skills.filter((skill) => skill.category_id === categoryId);
}

export function getProjectsBySkill(skillId: string): Project[] {
    return projects.filter((project) => project.skills_used.includes(skillId));
}

export function getRelatedProjects(projectId: string, limit = 3): Project[] {
    const currentProject = projects.find((project) => project.id === projectId);

    if (!currentProject) return [];

    return projects
        .filter((project) => project.id !== projectId)
        .map((project) => {
            const sharedSkills = project.skills_used.filter((skillId) =>
                currentProject.skills_used.includes(skillId)
            ).length;

            return { project, sharedSkills };
        })
        .filter(({ sharedSkills }) => sharedSkills > 0)
        .sort((a, b) => b.sharedSkills - a.sharedSkills)
        .slice(0, limit)
        .map(({ project }) => project);
}
