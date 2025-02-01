export interface SkillProps {
    _id?: string;
    name: string;
    logoUrl: string;
}

export interface ProjectProps {
    _id?: string;
    name: string;
    github: string;
    img: string;
    visitUrl?: string;
    visit?: string;
}

export interface DetailsProps {
    name: string;
    welcomeMsg: string;
    sub: string;
}

export interface ContactProps {
    email: string;
    linkedin: string;
    twitter: string;
    github: string;
    instagram: string;
}

export interface MyDetailsProps {
    name: string;
    welcomeMsg: string;
    sub: string;
    projects: ProjectProps[];
    skills: SkillProps[];
    contacts: ContactProps;
    loading: boolean

    setDetails: (details: DetailsProps) => void;
    setProjects: (projects: ProjectProps[]) => void;
    setSkills: (skills: SkillProps[]) => void;
    setContacts: (contacts: ContactProps) => void;
    setLoading: (state: boolean) => void

    fetchData: () => void;
}