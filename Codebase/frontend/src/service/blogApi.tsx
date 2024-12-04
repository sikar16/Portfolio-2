import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Blog } from '../_type/_blog';
import { getToken } from '../util/getToken';

const baseUrl = import.meta.env.VITE_API_URL;

export const blogApi = createApi({
    reducerPath: 'blogApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}/blog`,
        // Uncomment and complete this line if you need to set up authorization headers
        prepareHeaders: async (headers) => {
            const token = await getToken(); // Assume you have a function to get the token
            if (token) {
                headers.set("Authorization", `Bearer ${token}`); // Use Bearer token format
            }
            return headers;
        },
    }),
    tagTypes: ["blog"],
    endpoints: (builder) => ({
        getAllblog: builder.query<Blog[], void>({
            query: () => ({
                url: '/',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            transformResponse: (response: any) =>
                response.success ? (response.data as Blog[]) : ([] as Blog[]),
            providesTags: ["blog"], // Ensures data is refetched when invalidated
        }),
    }),
});

// Export hooks for usage in functional components, which are auto-generated based on the defined endpoints
export const { useGetAllblogQuery } = blogApi;