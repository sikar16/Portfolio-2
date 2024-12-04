import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProjectCategory } from '../_type/_projectType';
import extractErrorMessage from '../util/extractErrorMessage';
import { getToken } from '../util/getToken';
const baseUrl = import.meta.env.VITE_API_URL;

export const projectCategoryApi = createApi({
    reducerPath: 'projectCategoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}/projectCategory`,
        prepareHeaders: async (headers) => {
            const token = await getToken();
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["projectCatagory"],
    endpoints: (builder) => ({
        getAllprojectCategory: builder.query<ProjectCategory[], void>({
            query: () => ({
                url: '/',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            transformResponse: (response: any) =>
                response.success ? (response.data as ProjectCategory[]) : ([] as ProjectCategory[]),
            providesTags: ["projectCatagory"],
            transformErrorResponse: (response: any) =>
                extractErrorMessage(response?.data?.message || "Unknown error"),

        }),
        addNewProjectCategory: builder.mutation<void, ProjectCategory>({
            query: (data) => ({
                url: `/create`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data,
            }),
            invalidatesTags: ["projectCatagory"],
            transformErrorResponse: (response: any) => {
                const message = response?.data?.message || "Unknown error";
                return extractErrorMessage(message);
            },
        }),
        deleteProjectCategory: builder.mutation<void, { params: number }>({
            query: ({ params }) => ({
                url: `/delete/${params}`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: [{ type: 'projectCategory' }], // Ensures cache is invalidated properly
            transformErrorResponse: (response: any) => {
                const message = response?.data?.message || 'Unknown error';
                return extractErrorMessage(message); // Ensure this function is defined elsewhere
            },
        }),
        updateprojectCatagory: builder.mutation({
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
            invalidatesTags: ["projectCatagory"], // Ensures refetching after update
            transformErrorResponse: (response: any) => {
                const message = response?.data?.message || "Unknown error"; // Safely access the message
                return extractErrorMessage(message);
            },
        }),
    }),
});

export const { useGetAllprojectCategoryQuery, useAddNewProjectCategoryMutation, useDeleteProjectCategoryMutation, useUpdateprojectCatagoryMutation } = projectCategoryApi;