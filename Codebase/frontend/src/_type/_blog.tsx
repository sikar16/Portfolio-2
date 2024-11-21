import { Project } from "./_projectType";
import { User } from "./_userType";

export interface Blog {
    id: number;
    title: string;
    content: string;
    userId: number;
    user: User;
    blogImages: BlogImage[];
}

export interface ProjectImage {
    id: number;
    image: string;
    project: Project[];
}

export interface BlogImage {
    id: number;
    imageUrl: string;
    blogId: number;
    blog: Blog;
}