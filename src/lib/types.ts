export type ProjectStatus = "live" | "in-progress" | "archived";

export type SkillConfidence =
    | "production"
    | "shipped"
    | "academic"
    | "learning";

export type ViewMode = "list" | "graph";

export type SiteCTA = {
    label: string;
    href: string;
};

export type SiteLinks = {
    github_url: string;
    linkedin_url: string;
    resume_url: string;
    email: string;
};

export type SiteInfo = {
    name: string;
    domain: string;
    location: string;
    headline: string;
    subheadline: string;
};

export type SiteData = {
    site: SiteInfo;
    links: SiteLinks;
    cta: {
        primary: SiteCTA;
        secondary: SiteCTA;
    };
};

export type ProjectLinks = {
    live_demo?: string;
    github?: string;
    api?: string;
};

export type ProjectMedia = {
    architecture?: string;
    screenshots?: string[];
};

export type Project = {
    id: string;
    slug: string;
    name: string;
    status: ProjectStatus;
    one_liner: string;
    summary?: string;
    primary_tags: string[];
    skills_used: string[];
    evidence: string[];
    links: ProjectLinks;
    media?: ProjectMedia;
};

export type SkillCategory = {
    id: string;
    label: string;
    description?: string;
};

export type Skill = {
    id: string;
    label: string;
    category_id: string;
    summary: string;
    confidence: SkillConfidence;
    tools: string[];
    evidence: string[];
};

export type SkillsData = {
    categories: SkillCategory[];
    skills: Skill[];
};

export type GraphNodeKind = "category" | "skill";
export type GraphEdgeKind = "belongs_to" | "co_occurs";

export type GraphNode = {
    id: string;
    label: string;
    kind: GraphNodeKind;
    category_id?: string;
};

export type GraphEdge = {
    source: string;
    target: string;
    kind: GraphEdgeKind;
};

export type SkillGraph = {
    nodes: GraphNode[];
    edges: GraphEdge[];
};

export type RelatedProject = {
    project: Project;
    sharedSkills: number;
};
