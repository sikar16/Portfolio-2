import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import Portifolio from "../layout/Portifolio/Portifolio";
import Dashboard from "../layout/Dashboard/Dashboard";
import Try from "../feature/Try";
import Serviceprovider from "../feature/Serviceprovider";
import User from "../feature/User";
import Login from "../feature/Login";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route
                path="/portifolio"
                element={<Portifolio />}
            />
            <Route
                path="/"
                element={<Login />}
            />
            <Route
                path="/dashboard"
                element={<Dashboard />}
            />
            {/* <Route
                path="/try"
                element={<Try />}
            /> */}
            <Route
                path="/sp"
                element={<Serviceprovider />}
            />
            <Route
                path="/user"
                element={<User />}
            />
        </>
    ))