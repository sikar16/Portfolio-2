import { User } from "./_userType";

export interface Testimonial {
    id: number;
    reviewerFullName: string;
    reviewerTitle: string;
    reviewerImage?: string;
    feedback: string;
    dateOfReview: Date;
    userId: number;
    user: User;
}