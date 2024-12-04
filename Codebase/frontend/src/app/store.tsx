import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { skillCategoryApi } from '../service/skillCategoryApi';
import { projectCategoryApi } from '../service/projectCategoryApi';
import { serviceApi } from '../service/serviceApi';
import { skillApi } from '../service/skillApi';
import { loginApi } from '../service/loginApi';
import { blogApi } from '../service/blogApi';
import { projectApi } from '../service/projectApi';

export const store = configureStore({
    reducer: {
        [skillCategoryApi.reducerPath]: skillCategoryApi.reducer,
        [projectCategoryApi.reducerPath]: projectCategoryApi.reducer,
        [serviceApi.reducerPath]: serviceApi.reducer,
        [skillApi.reducerPath]: skillApi.reducer,
        [loginApi.reducerPath]: loginApi.reducer,
        [blogApi.reducerPath]: blogApi.reducer,
        [projectApi.reducerPath]: projectApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            skillCategoryApi.middleware,
            projectCategoryApi.middleware,
            serviceApi.middleware,
            skillApi.middleware,
            loginApi.middleware,
            blogApi.middleware,
            projectApi.middleware
        ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;