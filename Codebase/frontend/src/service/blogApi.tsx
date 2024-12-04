import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Blog } from '../_type/_blog';
import { getToken } from '../util/getToken';
import extractErrorMessage from '../util/extractErrorMessage';

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
        addBlog: builder.mutation<void, Blog>({
            query: (data) => ({
                url: '/create',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data,
            }),
            invalidatesTags: ["blog"],
            transformErrorResponse: (response: any) => {
                const message = response?.data?.message || "Unknown error";
                return extractErrorMessage(message);
            }
        }),
        deleteBog: builder.mutation<void, { params: number }>({
            query: ({ params }) => ({
                url: `/delete/${params}`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: [{ type: 'blog' }], // Ensures cache is invalidated properly
            transformErrorResponse: (response: any) => {
                const message = response?.data?.message || 'Unknown error';
                return extractErrorMessage(message); // Ensure this function is defined elsewhere
            },
        }),
        updateblog: builder.mutation({
            query: ({
                body: { name },
                params,
            }: {
                body: { name: string };
                params: number;
            }) => ({
                url: `/update/${params}`,
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: { name },
            }),
            invalidatesTags: ["blog"], // Ensures refetching after update
            transformErrorResponse: (response: any) => {
                const message = response?.data?.message || "Unknown error"; // Safely access the message
                return extractErrorMessage(message);
            },
        }),
    }),
});

// Export hooks for usage in functional components, which are auto-generated based on the defined endpoints
export const { useGetAllblogQuery, useAddBlogMutation, useDeleteBogMutation, useUpdateblogMutation } = blogApi;