import { User } from "./_userType";

export interface Service {
    id: number;
    name: string;
    image?: string;
    description: string;
    userId: number;
    user: User;
}