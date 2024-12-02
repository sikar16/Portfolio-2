import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { skillCategoryApi } from '../service/skillCategoryApi';
import { projectCategoryApi } from '../service/projectCategoryApi';
import { serviceApi } from '../service/serviceApi';
import { skillApi } from '../service/skillApi';
import { loginApi } from '../service/loginApi';

export const store = configureStore({
    reducer: {
        [skillCategoryApi.reducerPath]: skillCategoryApi.reducer,
        [projectCategoryApi.reducerPath]: projectCategoryApi.reducer,
        [serviceApi.reducerPath]: serviceApi.reducer,
        [skillApi.reducerPath]: serviceApi.reducer,
        [loginApi.reducerPath]: loginApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            skillCategoryApi.middleware,
            projectCategoryApi.middleware,
            serviceApi.middleware,
            skillApi.middleware,
            loginApi.middleware
        ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;