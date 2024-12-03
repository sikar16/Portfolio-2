import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProjectCategory } from '../_type/_projectType';
import extractErrorMessage from '../util/extractErrorMessage';
import { getToken } from '../util/getToken';
const baseUrl = import.meta.env.VITE_API_URL;

// Define a service using a base URL and expected endpoints
export const projectCategoryApi = createApi({
    reducerPath: 'projectCategoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}/projectCategory`,
        // Uncomment and complete this line if you need to set up authorization headers
        prepareHeaders: async (headers) => {
            const token = await getToken(); // Assume you have a function to get the token
            if (token) {
                headers.set("Authorization", `Bearer ${token}`); // Use Bearer token format
            }
            return headers;
        },
    }),
    tagTypes: ["projectCatagory"],
    endpoints: (builder) => ({
        getAllproject: builder.query<ProjectCategory[], void>({
            query: () => ({
                url: '/',
                method: 'GET',
                // headers: {
                //     'Content-Type': 'application/json',
                // },
            }),
            transformResponse: (response: any) =>
                response.success ? (response.data as ProjectCategory[]) : ([] as ProjectCategory[]),
            providesTags: ["projectCatagory"],
            transformErrorResponse: (response: any) =>
                extractErrorMessage(response?.data?.message || "Unknown error"),

        }),
    }),
});

export const { useGetAllprojectQuery } = projectCategoryApi;