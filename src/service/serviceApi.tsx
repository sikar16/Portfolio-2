import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Service } from '../_type/_serviceType';
import { getToken } from '../util/getToken';
import extractErrorMessage from '../util/extractErrorMessage';

const baseUrl = import.meta.env.VITE_API_URL;

export const serviceApi = createApi({
    reducerPath: 'serviceApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}/service`,
        prepareHeaders: async (headers) => {
            const token = await getToken(); // Assume you have a function to get the token
            if (token) {
                headers.set("Authorization", `Bearer ${token}`); // Use Bearer token format
            }
            return headers;
        },
    }),
    tagTypes: ["service"],
    endpoints: (builder) => ({
        getAllservice: builder.query<Service[], void>({
            query: () => ({
                url: '/',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            transformResponse: (response: any) =>
                response.success ? (response.data as Service[]) : ([] as Service[]),
            providesTags: ["service"], // Ensures data is refetched when invalidated
        }),
        addService: builder.mutation<void, Service>({
            query: (data) => ({
                url: `/create`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data,
            }),
            invalidatesTags: ["service"],
            transformErrorResponse: (response: any) => {
                const message = response?.data?.message || "Unknown error";
                return extractErrorMessage(message);
            }
        }),
        deleteService: builder.mutation<void, { params: number }>({
            query: ({ params }) => ({
                url: `/${params}`, // Fixed URL format
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ["service"],
            transformErrorResponse: (response: any) => {
                const message = response?.data?.message || 'Unknown error';
                return extractErrorMessage(message);
            },
        }),
        updateservice: builder.mutation({
            query: ({
                body: { name, image, description }, // Include image and description
                params,
            }: {
                body: {
                    name: string,
                    image: string,
                    description: string,
                };
                params: number;
            }) => ({
                url: `/${params}`,
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: { name, image, description }, // Include all three fields
            }),
            invalidatesTags: ["service"], // Ensures refetching after update
            transformErrorResponse: (response: any) => {
                const message = response?.data?.message || "Unknown error"; // Safely access the message
                return extractErrorMessage(message);
            },
        }),
    }),
});

// Export hooks for usage in functional components, which are auto-generated based on the defined endpoints
export const { useGetAllserviceQuery, useAddServiceMutation, useDeleteServiceMutation, useUpdateserviceMutation } = serviceApi;