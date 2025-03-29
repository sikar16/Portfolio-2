import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SkillCategory } from '../_type/_skillType';
import { getToken } from '../util/getToken';
import extractErrorMessage from '../util/extractErrorMessage';

const baseUrl = import.meta.env.VITE_API_URL;

// Define a service using a base URL and expected endpoints
export const skillCategoryApi = createApi({
    reducerPath: 'skillCategoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}/skillCategory`,
        prepareHeaders: async (headers) => {
            const token = await getToken();
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
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
        addAllSkillCategory: builder.mutation<void, SkillCategory>({
            query: (data) => ({
                url: `/create`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data,
            }),
            invalidatesTags: ["skillCategory"],
            transformErrorResponse: (response: any) => {
                const message = response?.data?.message || "Unknown error";
                return extractErrorMessage(message);
            }
        }),
        deleteSkillCategory: builder.mutation<void, { params: number }>({
            query: ({ params }) => ({
                url: `/delete/${params}`, // Fixed URL format
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ["skillCategory"],
            transformErrorResponse: (response: any) => {
                const message = response?.data?.message || 'Unknown error';
                return extractErrorMessage(message);
            },
        }),
        updateskillCatagory: builder.mutation({
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
            invalidatesTags: ["skillCategory"], // Ensures refetching after update
            transformErrorResponse: (response: any) => {
                const message = response?.data?.message || "Unknown error"; // Safely access the message
                return extractErrorMessage(message);
            },
        }),
    })
});


// Export hooks for usage in functional components, which are auto-generated based on the defined endpoints
export const { useGetAllSkillCategoryQuery, useAddAllSkillCategoryMutation, useDeleteSkillCategoryMutation, useUpdateskillCatagoryMutation } = skillCategoryApi;