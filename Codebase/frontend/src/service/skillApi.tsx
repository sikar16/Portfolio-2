import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Skill } from '../_type/_skillType';
import { getToken } from '../util/getToken';
import extractErrorMessage from '../util/extractErrorMessage';

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
            providesTags: ["skill"],
        }),
        addNewSkill: builder.mutation<void, Skill>({
            query: (data) => ({
                url: `/create`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data,
            }),
            invalidatesTags: ["skill"],
            transformErrorResponse: (response: any) => {
                const message = response?.data?.message || "Unknown error";
                return extractErrorMessage(message);
            },
        }),
        deleteSkill: builder.mutation<void, { params: number }>({
            query: ({ params }) => ({
                url: `/delete/${params}`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: [{ type: 'skill' }],
            transformErrorResponse: (response: any) => {
                const message = response?.data?.message || 'Unknown error';
                return extractErrorMessage(message);

            },
        }),
        updateskill: builder.mutation({
            query: ({
                body: {
                    name,
                    description,
                    image,
                    skillCategory,
                },
                params,
            }: {
                body: {
                    name: string;
                    description: string;
                    image: string;
                    skillCategory: {
                        name: string;
                    };
                };
                params: number;
            }) => ({
                url: `/${params}`,
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: { name, description, image, skillCategory }, // Include all necessary fields
            }),
            invalidatesTags: ["skill"],
            transformErrorResponse: (response: any) => {
                const message = response?.data?.message || "Unknown error"; // Safely access the message
                return extractErrorMessage(message);
            },
        }),
    }),
});

export const { useGetAllskillQuery, useAddNewSkillMutation, useDeleteSkillMutation, useUpdateskillMutation } = skillApi;