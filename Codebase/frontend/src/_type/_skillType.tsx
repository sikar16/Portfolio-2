import { User } from "./_userType";

export interface SkillCategory {
    id: number;
    name: string;
    userId: number;
    user: User;
    skills: Skill[];
}

export interface Skill {
    id: number;
    name: string;
    description: string;
    image?: string;
    skillCategoryId: number;
    userId: number;
    skillCategory: SkillCategory;
    user: User;
}