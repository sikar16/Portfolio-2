import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import Portifolio from "../layout/Portifolio";
import Dashboard from "../layout/Dashboard";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route
                path="/"
                element={<Portifolio />}
            />
            <Route
                path="/dashboard"
                element={<Dashboard />}
            />
        </>
    ))