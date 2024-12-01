import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SkillCategory } from '../_type/_skillType';

const baseUrl = import.meta.env.VITE_API_URL;

// Define a service using a base URL and expected endpoints
export const skillCategoryApi = createApi({
    reducerPath: 'skillCategoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}/skillCategory`,
        // Uncomment and complete this line if you need to set up authorization headers
        // prepareHeaders: async (headers) => {
        //     const token = await getToken(); // Assume you have a function to get the token
        //     if (token) {
        //         headers.set("Authorization", `${token}`);
        //     }
        //     return headers;
        // },
    }),
    tagTypes: ["skillCategory"],
    endpoints: (builder) => ({
        getAllSkillCategory: builder.query<SkillCategory[], void>({
            query: () => ({
                url: '/',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            transformResponse: (response: any) =>
                response.success ? (response.data as SkillCategory[]) : ([] as SkillCategory[]),
            providesTags: ["skillCategory"], // Ensures data is refetched when invalidated
        }),
    }),
});

// Export hooks for usage in functional components, which are auto-generated based on the defined endpoints
export const { useGetAllSkillCategoryQuery } = skillCategoryApi;