import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Skill } from '../_type/_skillType';
import { getToken } from '../util/getToken';

const baseUrl = import.meta.env.VITE_API_URL;

// Define a service using a base URL and expected endpoints
export const skillApi = createApi({
    reducerPath: 'skillApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}/skill`,
        prepareHeaders: async (headers) => {
            const token = await getToken();
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
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