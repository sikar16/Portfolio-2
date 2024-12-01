import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProjectCategory } from '../_type/_projectType';
const baseUrl = import.meta.env.VITE_API_URL;

// Define a service using a base URL and expected endpoints
export const projectCategoryApi = createApi({
    reducerPath: 'projectCategoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}/projectCategory`,
    }),
    tagTypes: ["projectCatagory"],
    endpoints: (builder) => ({
        getAllproject: builder.query<ProjectCategory[], void>({
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
        }),
    }),
});

export const { useGetAllprojectQuery } = projectCategoryApi;