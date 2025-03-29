import { Blog } from "./_blog";
import { Project, ProjectCategory, ProjectTechnology } from "./_projectType";
import { Service } from "./_serviceType";
import { Skill, SkillCategory } from "./_skillType";
import { Testimonial } from "./_testimony";

export enum UserStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    SUSPENDED = "SUSPENDED",
}
export interface User {
    id: number;
    phoneNumber: string;
    email: string;
    password: string;
    status: UserStatus;
    createdAt: Date;
    userInfo?: UserInfo;
    userDetails?: UserDetail;
    services: Service[];
    skills: Skill[];
    projects: Project[];
    testimonials: Testimonial[];
    blogs: Blog[];
    socialLinks: SocialMediaLink[];
    technologies: ProjectTechnology[];
    projectCategory: ProjectCategory[];
    skillCategory: SkillCategory[];
}

export interface UserInfo {
    id: number;
    firstName: string;
    lastName: string;
    middleName?: string;
    country: string;
    city: string;
    userId: number;
    user: User;
}

export interface UserDetail {
    id: number;
    title: string;
    quote: string;
    heroImage?: string;
    aboutImage?: string;
    yearsOfExperience: number;
    aboutMe: string;
    cv?: string;
    rate: number;
    userId: number;
    user: User;
}

export interface SocialMediaLink {
    id: number;
    name: string;
    link: string;
    userId: number;
    user: User;
}