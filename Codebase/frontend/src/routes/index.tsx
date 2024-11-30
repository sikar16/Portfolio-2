import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import Portifolio from "../layout/Portifolio/Portifolio";
import Dashboard from "../layout/Dashboard/Dashboard";

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