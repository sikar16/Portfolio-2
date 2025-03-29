import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Project } from '../_type/_projectType';
import { getToken } from '../util/getToken';
import extractErrorMessage from '../util/extractErrorMessage';

const baseUrl = import.meta.env.VITE_API_URL;

export const projectApi = createApi({
    reducerPath: 'projectApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}/project`,
        // Uncomment and complete this line if you need to set up authorization headers
        prepareHeaders: async (headers) => {
            const token = await getToken(); // Assume you have a function to get the token
            if (token) {
                headers.set("Authorization", `Bearer ${token}`); // Use Bearer token format
            }
            return headers;
        },
    }),
    tagTypes: ["project"],
    endpoints: (builder) => ({
        getAllproject: builder.query<Project[], void>({
            query: () => ({
                url: '/',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            transformResponse: (response: any) =>
                response.success ? (response.data as Project[]) : ([] as Project[]),
            providesTags: ["project"], // Ensures data is refetched when invalidated
        }),
        addNewProject: builder.mutation<void, Project>({
            query: (data) => ({
                url: `/create`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data,
            }),
            invalidatesTags: ["project"],
            transformErrorResponse: (response: any) => {
                const message = response?.data?.message || "  error";
                return extractErrorMessage(message);
            },
        }),
        deleteProject: builder.mutation<void, { params: number }>({
            query: ({ params }) => ({
                url: `/delete/${params}`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: [{ type: 'project' }], // Ensures cache is invalidated properly
            transformErrorResponse: (response: any) => {
                const message = response?.data?.message || 'Unknown error';
                return extractErrorMessage(message); // Ensure this function is defined elsewhere
            },
        }),
        updateProject: builder.mutation({
            query: ({
                body: {
                    name,
                    description,
                    demoLink,
                    technology,
                    projectCategoryId,
                    projectImage,
                },
                params,
            }: {
                body: {
                    name: string;
                    description: string;
                    demoLink: string;
                    technology: string;
                    projectCategoryId: number;
                    projectImage: string[];
                };
                params: number;
            }) => ({
                url: `/updateProject/${params}`,
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: { name, description, demoLink, technology, projectCategoryId, projectImage },
            }),
            invalidatesTags: ["project"], // Ensures refetching after update
            transformErrorResponse: (response: any) => {
                const message = response?.data?.message || "Unknown error"; // Safely access the message
                return extractErrorMessage(message); // Ensure this function is defined elsewhere
            },
        }),
    }),
});

// Export hooks for usage in functional components, which are auto-generated based on the defined endpoints
export const { useGetAllprojectQuery, useAddNewProjectMutation, useDeleteProjectMutation, useUpdateProjectMutation } = projectApi;