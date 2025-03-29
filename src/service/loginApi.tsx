import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../util/getToken";

const baseUrl = import.meta.env.VITE_API_URL;

type LoginResponse = {
    success: boolean;
    token?: string;
    role?: string;
    message?: string;
};

interface LoginDataType {
    email: string;
    password: string;
}

export const loginApi = createApi({
    reducerPath: "loginApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}user`,
        prepareHeaders: async (headers) => {
            const token = await getToken();
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["user"],
    endpoints: (builder) => ({
        loginUser: builder.mutation<LoginResponse, LoginDataType>({
            query: (loginData) => ({
                url: `http://localhost:5454/api/public/login`,
                method: "POST",
                body: loginData,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer token",
                },
            }),
            transformResponse: (response: LoginResponse) => {
                return response;
            },
            transformErrorResponse: (response: any) => {
                return response.data;
            },
        }),
    }),
});

export const {
    useLoginUserMutation,
} = loginApi;
