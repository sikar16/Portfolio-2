import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import Portifolio from "../layout/Portifolio/Portifolio";


export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route
                path="/"
                element={<Portifolio />}
            />

        </>
    ))