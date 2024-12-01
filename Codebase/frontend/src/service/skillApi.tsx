import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Skill } from '../_type/_skillType';

const baseUrl = import.meta.env.VITE_API_URL;

export const skillApi = createApi({
    reducerPath: 'skillApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}/skill`,
        // Uncomment and complete this line if you need to set up authorization headers
        // prepareHeaders: async (headers) => {
        //     const token = await getToken(); // Assume you have a function to get the token
        //     if (token) {
        //         headers.set("Authorization", `${token}`);
        //     }
        //     return headers;
        // },
    }),
    tagTypes: ["skill"],
    endpoints: (builder) => ({
        getAllskill: builder.query<Skill[], void>({
            query: () => ({
                url: '/',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            transformResponse: (response: any) =>
                response.success ? (response.data as Skill[]) : ([] as Skill[]),
            providesTags: ["skill"], // Ensures data is refetched when invalidated
        }),
    }),
});

// Export hooks for usage in functional components, which are auto-generated based on the defined endpoints
export const { useGetAllskillQuery } = skillApi;