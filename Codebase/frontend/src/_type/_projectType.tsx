import { User } from "./_userType";

export interface ProjectCategory {
    id: number;
    name: string;
    userId: number;
    user: User;
    projects: Project[];
}

export interface Project {
    id: number;
    name: string;
    description: string;
    demoLink?: string;
    userId: number;
    projectCategoryId: number;
    projectCategory: ProjectCategory;
    user: User;
    projectImagesId: number;
    projectImage: ProjectImage;
    technologiesId: number;
    technologies: ProjectTechnology;
}

export interface ProjectImage {
    id: number;
    image: string;
    project: Project[];
}

export interface ProjectTechnology {
    id: number;
    name: string;
    user: User[];
    projects: Project[];
}